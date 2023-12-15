import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

export function useAppState(props: any) {
    const {
        onChange,
        onForeground,
        onBackground,
        onBackForeground = () => { },
        onBackToActive = () => { }
    } = props || {};

    const [appState, setAppState] = useState<String>("");
    const [countAppState, setCountAppState] = useState("0");

    useEffect(() => {
        function handleAppStateChange(nextAppState: String) {
            if (appState == "inactive" && nextAppState == "active") {
                if ((typeof countAppState == "number") && (countAppState > 0)) {
                    onBackForeground();
                }
            } else if (nextAppState === 'active' && appState !== 'active') {
                isValidFunction(onForeground) && onForeground();
                if ((typeof countAppState == "number") && (countAppState > 0)) {
                    onBackToActive();
                }
            } else if (
                appState === 'active' &&
                nextAppState.match(/inactive|background/)
            ) {
                isValidFunction(onBackground) && onBackground();
            }
            setAppState(nextAppState);
            if (countAppState == "0") {
                setCountAppState(countAppState + 1);
            }
            isValidFunction(onChange) && onChange(nextAppState);
        }

        AppState.addEventListener('change', handleAppStateChange);

    }, [onChange, onForeground, onBackground, appState]);

    function isValidFunction(func: any) {
        return func && typeof func === 'function';
    }

    return appState;
}
