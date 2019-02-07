package com.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.RNTooltipsPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import org.reactnative.camera.RNCameraPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.mapbox.rctmgl.RCTMGLPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNTooltipsPackage(),
            new RNTextSizePackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeConfigPackage(),
            new RNCameraPackage(),
            new BlurViewPackage(),
            new AndroidOpenSettingsPackage(),
            new LottiePackage(),
            new RCTMGLPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
