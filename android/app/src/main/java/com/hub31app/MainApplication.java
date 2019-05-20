package com.hub31app;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.facebook.react.ReactApplication;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.psykar.cookiemanager.CookieManagerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage(), new RealmReactPackage(), new ReactVideoPackage(),
                    new VectorIconsPackage(), new SplashScreenReactPackage(), new OrientationPackage(),
                    new ReactNativeOneSignalPackage(), new LinearGradientPackage(), new KCKeepAwakePackage(),
                    new CookieManagerPackage(),
                    // new AppCenterReactNativeCrashesPackage(MainApplication.this,
                    // getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
                    // new AppCenterReactNativeAnalyticsPackage(MainApplication.this,
                    // getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
                    // new AppCenterReactNativePackage(MainApplication.this),
                    new CodePush("3CK9tpqlrsxIwOG-omawClriqQmZSJ07k5Wxm", getApplicationContext(), BuildConfig.DEBUG));
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
