<template>
  <el-container class='cookEndWrapper'>
    <el-container class='cookEndMain'>
      <div  v-show="isAllListDisplayed">
          这是全部订单
      </div>
        <div v-show="!isAllListDisplayed">
        <div  class="masonry">
          <div  class="toDoOrderWrapperInCookEnd item" v-for="order in allOrderToDo" :key="order.id" d>
            <div class="orderMetaData">{{order.table}}号桌    {{order.orderTime}}</div>
            <div class="orderMetaData"> 订单号 {{order.id}}</div>
            <hr/>

            <div class="wrapperOfDishesInToDoOrder" v-for="dish in order.dishList" :key="dish.dishID">
              <div id="dishWrapper">
              <div id="dishNameItem">{{dish.name}}</div>
              <div id="dishAmountItem">{{dish.number}}份</div>
              <div id="dishCompletedItem">
                <button id="finishADishInAOrderButton" v-show="!dish.finished" @click="finishADishInAOrder(order.id, dish.dishID)">完成</button>
                <div id="ADishInAOrderIsFinishedText" v-show="dish.finished">已完成</div>
              </div>
              </div>
            </div>

            <hr/>

            <div>备注: {{order.note}} </div>
            <button v-show="!order.isOrderCompleted" id="allCompletedButton" @click="finishAOrder(order.id)">全部完成</button>
            </div>
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
      isAllListDisplayed: false,
      buttonText: '全部订单',
      allOrderToDo: []
    }
  },
  methods: {
    changeDisplayedList: function () {
      if (this.isAllListDisplayed) {
        this.buttonText = '全部订单'
      } else {
        this.buttonText = '未做订单'
      }
      this.isAllListDisplayed = !this.isAllListDisplayed
    },

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
    }
  },

  computed: {

  },
  created () {
    service.getAllToDoOrder(
      (textGet) => {
        this.allOrderToDo = textGet['data']
        // 每个订单获取菜品
        this.allOrderToDo.forEach(order => {
          axios.get('/api/dishrecord/' + order.id + '/')
            .then(res => {
              let idx = this.allOrderToDo.findIndex(odr => odr.id === order.id)
              this.$set(this.allOrderToDo[idx], 'dishList', res['data'])
              console.log(this.allOrderToDo[idx].dishList)
            })
            .catch(err => console.log(err))
        })
      }
    )
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
}

.toDoOrderWrapperInCookEnd {
  border-color: black;
  border-width: 1px;
  border-style: solid;
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
  margin: 15px 15px 15px 0; /* Some gutter */
  background-color: #cfcccc;
}

.orderMetaData {
  font-size: 14px;
  background-color: #b3b2b2;
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
  width: 100%;
  margin-bottom: 5px;
  background-color: #b56969;
}

#finishADishInAOrderButton {
  background-color: #b56969;
}

#ADishInAOrderIsFinishedText {
  color: #447c16;
}
</style>
