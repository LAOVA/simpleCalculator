<template>
  <div class="main">
    <span class="title">计算器</span>
    <div class="output">{{ output }}</div>
    <div class="input">{{ content }}</div>
    <div class="top">
      <div @click="Reset()">C</div>
      <div @click="Delete()">←</div>
    </div>
    <div class="NumBox">
      <div class="Num">
        <div class="item" v-for="i in 9" @click="addContent(9 - i + 1)">{{ 9 - i + 1 }}
        </div>
      </div>
      <div class="tools">
        <div class="item" @click="addSymbol('*')">×</div>
        <div class="item" @click="addSymbol('-')">-</div>
        <div class="item" @click="addSymbol('+')">+</div>
      </div>
    </div>
    <div class="bottom">
      <div class="item" @click="turn()">±</div>
      <div class="item" @click="addContent(0)">0</div>
      <div class="item" @click="addPoint()">.</div>
      <div class="item" @click="getRes()">=</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
// import { run } from '../utils/run'
import http from '../http/http'
import { ref } from 'vue'
const content = ref<string>('0')
const output = ref<string>('')

// 重置
const Reset = (): void => {
  content.value = '0'
  output.value = ''
}

// 退位
const Delete = (): void => {
  console.log(content.value);

  content.value = content.value.length !== 1 ? content.value.toString().slice(0, -1) : '0'
}

// 输入数字
const addContent = (i: Number): void => {
  if (content.value === '0') {
    content.value = i.toString()
  } else {
    content.value += i.toString()
  }
}

// 正负转变
const turn = (): void => {
  if (Number(content.value) < 0) {
    content.value = content.value.slice(1)
  } else if (Number(content.value) > 0) {
    content.value = '-' + content.value
  }
}

// 添加小数点
const addPoint = (): void => {
  if (!content.value.includes('.')) {
    content.value += '.'
  }
}

// 添加运算符号
const addSymbol = (e: string): void => {
  output.value = output.value + content.value + e;
  content.value = '0'
}


// 运算
const getRes = async () => {
  output.value
  // 本地计算
  // content.value = run(output.value + content.value)

  // 后台计算
  let { data } = await http.requestGET<any>('get', '/api/run', { data: output.value + content.value })
  content.value = data.data
  output.value = ''
}


</script>

<style scoped lang='scss'>
.main {
  width: 330px;
  background-color: #E6E6E6;
  border: 1px solid #888;
  box-shadow: 0px 0px 10px 0px rgba($color: #000000, $alpha: 0.3);

  .title {
    display: inline-block;
    margin: 8px 0 0 8px;
  }

  .output {
    text-align: end;
    margin-right: 4px;
  }

  .input {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 97%;
    margin-left: 6px;
    height: 80px;
    font-size: 40px;
    font-weight: 600;
    text-align: end;
    overflow: hidden;
  }

  .top {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50px;
    user-select: none;

    div {
      display: flex;
      width: 48%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: #F0F0F0;
      font-size: 20px;
      color: #666;

      &:hover {
        background-color: #d0d0d0;
        box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.7);
      }
    }
  }

  .NumBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .Num {
      flex: 75%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row-reverse;
      justify-content: space-evenly;
      align-content: center;

      div {
        font-weight: 600;
        background-color: #f9f9f9;

        &:hover {
          background-color: #e0e0e0;
          box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.7);
        }

      }
    }

    .tools {
      flex: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: space-evenly;
      user-select: none;

      div {
        font-size: 30px;
        color: #666;
        background-color: #F0F0F0;


        &:hover {
          background-color: #e0e0e0;
          box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.7);
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 4px;
    user-select: none;

    div {
      font-size: 30px;
      color: #666;
      background-color: #F0F0F0;

      &:hover {
        background-color: #e0e0e0;
        box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.7);
      }

      &:nth-child(2) {
        font-weight: 600;
        color: #000000;
        background-color: #f9f9f9;

        &:hover {
          background-color: #e0e0e0;
          box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.7);
        }
      }

      &:nth-child(4) {
        background-color: #00AAB5;
      }
    }
  }
}

.item {
  display: flex;
  width: 77px;
  height: 50px;
  margin-top: 4px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
}
</style>