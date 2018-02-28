# WeatherWX
微信小程序
由于公司打算要搞一个小程序app,所以趁闲先自己搞一个试试手，小程序搜索----即时天气(已上线)。

![小程序二维码.jpg](http://upload-images.jianshu.io/upload_images/2868618-0f2cbfd439e2b7b8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![应用截图1.png](http://upload-images.jianshu.io/upload_images/2868618-965d1dd59f0e64a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![应用截图2.png](http://upload-images.jianshu.io/upload_images/2868618-1fe1b9f306160a8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 浅谈项目
这个项目的天气数据使用了和风的天气api.由于请求用户当前位置的时候只有经纬度，所以又利用了高德的api进行地理反编码。接口方面就这么多了，很简单哈~
### 浅谈项目中的难点吧
整体上反正是根据微信小程序官网文档进行开发，有html+css+js的基础的吧，上手很快~就是文档上的wxss的样式代码基本没有，所以有的时候怎么试都不行，像scroll-view，只能百度了，css的知识都忘了很多，像flex,display什么的简直是晕了。反正是一边做一边百度。假如要做一个大项目，看来要买本css的书好好从头看看了。
其他的就是头部的地址展示不会，背景要根据文字自适应,百度后核心代码：
```xml
        <view class='location' bindtap='chooseLocation'>
          <view>
            <image class='locationImg' src='../img/location.png' mode='aspectFit'></image>
            <text >{{location}}</text>
          </view>
        </view>
```
```css
.location {
  color: red;
  padding: 10rpx;
  font-size: 42rpx;
  font-family: "PingFangSC-Medium";
  text-align: center;
  position: absolute; 
   /* z-index: 2;  */
  top: 1%;  
  left: 0;
  right: 0;
  height: 56rpx;
}
.location view {
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  white-space: nowrap; 
}
.location view text {
  color: white;
  font-size: 30rpx;
  padding-right: 20rpx;
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  padding-left: 60rpx;
  white-space: nowrap;
  border-radius: 30rpx;
  background-color: rgba(215, 215, 215, 0.1);
}
```
![image.png](http://upload-images.jianshu.io/upload_images/2868618-a84120f00e8df54f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/2868618-7945a4597c9ccce3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
背景色不太明显哈~
### show me code
喜欢的话给个star哈~
