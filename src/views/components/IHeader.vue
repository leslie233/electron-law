<template>
  <header class="header flex-between">
    <template v-if="currentRouteName === 'setting'">
      <button class="icon flex-center" title="返回">
        <router-link class="flex-center" to="/">
          <i class="iconfont flex-center icon-back"></i>
        </router-link>
      </button>
    </template>
    <template v-else>
      <!-- 打开新窗口 -->
      <!-- <button class="icon flex-center" @click="openNewWindow" title="新窗口">
        <i class="iconfont flex-center icon-add"></i>
      </button> -->
      <!-- <div class="icon-pointer icon flex-center" style="width:unset" @click="goHome">
        <el-icon><House /></el-icon>
        <span style="font-size:14px">首页</span>
      </div> -->
      <!-- 案件管理 -->
      <!-- <div class="icon-pointer icon flex-center" style="width:unset;margin-left:5px" @click="goCase">
        <el-icon><Document /></el-icon>
        <span style="font-size:14px">案件管理</span>
      </div> -->
      <div style="width:120px">
      </div>
    </template>
    <!-- 标题拖动 -->
    <div class="drag-header flex1 flex-center" :style="computedPaddingLeft">
      <transition name="header-fadein" v-if="platformWindows">
        <span :key="title">{{ title }}</span>
      </transition>
    </div>
    <!-- 右侧操作 -->
    <div class="operation-btn flex-items">
      <!-- 设置 -->
      <!-- <template v-if="currentRouteName === 'index'">
        <button class="icon flex-center" title="设置">
          <router-link class="flex-center" to="/setting">
            <i class="iconfont flex-center icon-setting"></i>
          </router-link>
        </button>
      </template> -->
      <template v-if="currentRouteName === 'editor'">
        <!-- 固定 -->
        <div class="thepin" :class="isAlwaysOnTop ? 'thepin-active' : ''">
          <div class="absolute-box">
            <button class="icon flex-center" @click="drawingPin" title="置顶">
              <i class="iconfont flex-center icon-thepin"></i>
            </button>
            <button class="icon flex-center" @click="drawingPin" title="取消置顶">
              <i class="iconfont flex-center icon-thepin-active"></i>
            </button>
          </div>
        </div>
        <!-- 更多 -->
        <button class="icon flex-center" @click="clickOptions" title="选项">
          <i class="iconfont flex-center icon-more"></i>
        </button>
      </template>
      <el-icon class="icon flex-center icon-pointer" color="#fff" @click="miniScreen"><Minus /></el-icon>
      <el-icon class="icon flex-center icon-pointer" color="#fff" @click="fullScreen"><FullScreen /></el-icon>
      <!-- 关闭 -->
      <el-icon v-if="platformWindows" class="icon flex-center icon-pointer" color="#fff" @click="closeWindow"><Close /></el-icon>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { browserWindowOption } from '@/config';
import { createBrowserWindow, transitCloseWindow, setFullScreen, setMinimize } from '@/utils';
import { remote } from 'electron';

export default defineComponent({
  emits: ['option-click', 'on-close'],
  setup(props, { emit }) {
    const router = useRouter()
    const editorWinOptions = browserWindowOption('editor');
    // 打开新窗口
    const openNewWindow = () => {
      createBrowserWindow(editorWinOptions, '/editor');
    };

    // 获取窗口固定状态
    let isAlwaysOnTop = ref(false);
    const currentWindow = remote.getCurrentWindow();
    isAlwaysOnTop.value = currentWindow.isAlwaysOnTop();

    // 固定前面
    const drawingPin = () => {
      if (isAlwaysOnTop.value) {
        currentWindow.setAlwaysOnTop(false);
        isAlwaysOnTop.value = false;
      } else {
        currentWindow.setAlwaysOnTop(true);
        isAlwaysOnTop.value = true;
      }
    };

    const currentRouteName = ref(useRoute().name);

    // 获取首页的内边距
    const computedPaddingLeft = computed(() => {
      return currentRouteName.value === 'index' ? 'padding-left: 40px;' : '';
    });

    const title = ref(useRoute().meta.title as string);

    onBeforeRouteUpdate((to, from, next) => {
      title.value = to.meta.title as string;
      document.title = title.value;
      currentRouteName.value = to.name;
      next();
    });

    const clickOptions = () => {
      emit('option-click');
    };

    // 关闭窗口
    const closeWindow = () => {
      emit('on-close');
      transitCloseWindow();
    };

    // 案件管理
    const goCase = () => {
      router.push({
        name: 'case',
      })
    };
    // 返回首页
    const goHome = () => {
      router.push({
        name: 'index',
      })
    };
    // 全屏
    const fullScreen = () => {
      setFullScreen()
    }
    // 最小化
    const miniScreen = () => {
      setMinimize()
    }
    return {
      openNewWindow,
      currentRouteName,
      drawingPin,
      clickOptions,
      closeWindow,
      computedPaddingLeft,
      isAlwaysOnTop,
      title,
      goCase,
      fullScreen,
      miniScreen,
      goHome,
      // 只在windows上显示
      platformWindows: process.platform === 'win32'
    };
  }
});
</script>

<style lang="less" scoped>
.header-fadein-enter,
.header-fadein-leave-to {
  display: none;
  opacity: 0;
  animation: header-fadein 0.4s reverse;
}
.header-fadein-enter-active,
.header-fadein-leave-active {
  opacity: 0;
  animation: header-fadein 0.4s;
}

@keyframes header-fadein {
  from {
    opacity: 0;
    margin-right: -14px;
  }
  to {
    opacity: 1;
    margin-right: 0;
  }
}

.header {
  height: @iconSize;
  background-color: #409eff;
  button {
    padding: 0;
    outline: none;
    border: none;
    background-color: transparent;
  }
  a {
    color: initial;
    width: 100%;
    height: 100%;
    outline: none;
  }
  .icon {
    width: @iconSize;
    height: @iconSize;
    .iconfont {
      // 头部icon大小在这里设置
      font-size: @headerIconFontSize;
      padding-bottom: 2px;
    }
  }
  .close-window:hover {
    background-color: @error-color;
    color: @white-color;
  }
  @keyframes fades {
    30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .drag-header {
    -webkit-app-region: drag;
    height: 36px;
    margin-top: 5px;
    padding-bottom: 5px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    box-sizing: border-box;
  }
}
.thepin {
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s;
  .absolute-box {
    position: absolute;
    top: 0;
    transition: all 0.4s;
  }
}
.thepin-active .absolute-box {
  top: -40px;
}
</style>
