package com.hub31app;

import android.os.Bundle;

import com.facebook.react.ReactFragmentActivity;

// CHANGED ReactActivity TO ReactFragmentActivity FOR react-native-screens
public class MainActivity extends ReactFragmentActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "hub31app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
