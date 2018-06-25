<template>
  <el-container class='cookEndWrapper'>
    <el-container class='cookEndMain'>

        <div>
        <div  class="masonry">
          <el-card class="toDoOrderWrapperInCookEnd item box-card" v-for="order in allOrderToDo" :key="order.id" shadow="hover">
            <div slot="header" class="clearfix">
              <span class="orderMetaData">{{order.table}}号桌    {{order.orderTime}}</span>
              <span class="orderMetaData"> 订单号 {{order.id}}</span>
              <el-button type="danger" v-show="!order.isOrderCompleted" id="allCompletedButton" @click="finishAOrder(order.id)">全部完成</el-button>
            </div>

            <div class="wrapperOfDishesInToDoOrder text item" v-for="dish in order.dishList" :key="dish.dishID">
              <div id="dishWrapper">
              <div id="dishNameItem">{{dish.name}}</div>
              <div id="dishAmountItem">{{dish.number}}份</div>
              <div id="dishCompletedItem">
                <button type="danger" id="finishADishInAOrderButton" v-show="!dish.finished" @click="finishADishInAOrder(order.id, dish.dishID)">完成</button>
                <div id="ADishInAOrderIsFinishedText" v-show="dish.finished">已完成</div>
              </div>
              </div>
            </div>

            <div id="dishNote">备注: {{order.note}} </div>
          </el-card>
        </div>
        </div>
    </el-container>
  </el-container>
</template>

<script>
import service from '../../../api/unitedInterface'
import axios from 'axios'

export default {
  name: 'cookEndPage',
  data: function () {
    return {
      buttonText: '全部订单',
      allOrderToDo: []
    }
  },
  methods: {
    showMessage: function (msg) {
      console.log(msg)
    },

    finishADishInAOrder: function (orderId, dishId) {
      var idx = this.allOrderToDo.findIndex(order => order.id === orderId)
      var jdx = this.allOrderToDo[idx].dishList.findIndex(dish => dish.dishID === dishId)
      // 必须通过$set，否则无法触发视图更新
      service.finishADishInAOrder(orderId, dishId, () => {
        this.$set(this.allOrderToDo[idx].dishList[jdx], 'finished', true)
      }, () => {
        // todo:显示错误信息
        this.showMessage('网络错误')
      })
    },

    finishAOrder: function (orderId) {
      console.log('点击完成订单' + orderId)
      var idx = this.allOrderToDo.findIndex(order => order.id === orderId)
      var jdx = this.allOrderToDo[idx].dishList.findIndex(dish => dish.finished === false)
      // jdx === -1, 说明所有dish都做好了
      if (jdx === -1) {
        service.finishAOrder(orderId, () => {
          this.$set(this.allOrderToDo[idx], 'finished', true)
          this.$delete(this.allOrderToDo, idx)
          // console.log(this.allOrderToDo)
        }, () => {
          // todo:显示错误信息
          this.showMessage('网络错误')
        })
      } else {
        this.showMessage('还有没完成的菜')
      }
    },

    getUnfinishedOrderRecycly: function () {
      // console.log('getUnfinishedOrder called')

      service.getAllToDoOrder(
        (textGet) => {
          this.allOrderToDo = textGet['data']
          // 每个订单获取菜品
          this.allOrderToDo.forEach(order => {
            axios.get('/api/dishrecord/' + order.id + '/')
              .then(res => {
                let idx = this.allOrderToDo.findIndex(odr => odr.id === order.id)
                this.$set(this.allOrderToDo[idx], 'dishList', res['data'])
              })
              .catch(err => console.log(err))
          })
        }
      )

      // 如果跳出了界面，就不继续请求了
      // 否则，当前计时完，开启下一个计时
      if (this.$route.path === '/main/order') {
        let _this = this
        this.timeOut = setTimeout(() => {
          _this.getUnfinishedOrderRecycly()
        }, 50000)
      } else {
        this.timeOut = ''
      }
    }
  },

  computed: {
    timeOut: {
      set (val) {
        this.$store.state.timeout = val
      },
      get () {
        return this.$store.state.timeout
      }
    }
  },

  created () {
    // 如果进入页面时，还有之前的计时器，就删除
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.getUnfinishedOrderRecycly()
  }
}
</script>

<style>
.cookEndMain {
  position: fixed;
  width: 90%;
  height: 100%;
  left: 10%;
  margin: 0;
  background-color: rgb(218, 214, 214);
}

.toDoOrderWrapperInCookEnd {
  border-width: 3px;
  border-style: none;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  background-color: white;
}

html {
  box-sizing: border-box;
}

.masonry {
  display: flex;
  flex-flow: row wrap;
  margin-right: 5vw;
  margin-left: 5vw; /* Adjustment for the gutter */
  width: 90%;
}

.item {
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  height: auto;
  min-width: 360px;
  margin: 20px 20px 20px 0; /* Some gutter */
  background-color: white;
}

.orderMetaData {
  font-size: 14px;
}

#dishWrapper {
  display: flex;
  flex-flow: row wrap;
}

#dishNameItem,#dishCompletedItem, #dishCompletedItem {
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  height: auto;
}

#dishNameItem {
  flex-shrink: 4;
  flex-grow: 4;
  width: 40%;
}

#dishAmountItem {
  flex-shrink: 1;
  flex-grow: 1;
}

#dishCompletedItem {
  flex-shrink: 1;
  flex-grow: 1;
}

#allCompletedButton {
  width: 30%;
  margin-bottom: 5px;
  background-color: #e75454;
  float: right;
  padding: 3px 0;
  color: white;
}

#finishADishInAOrderButton {
  background-color: #e75454;
  float: right;
  color: white;
  height: 21px;
  line-height: 21px;
  padding: auto;
  border-radius: 10%;
}

#finishADishInAOrderButton span {
  position: absolute;
  height: 15px;
  line-height: 15px;
}

#ADishInAOrderIsFinishedText {
  color: #447c16;
  float: right;
}

#dishNote {
  position: relative;
  bottom: 0;
  background-color: rgb(245, 240, 240);
}
</style>
