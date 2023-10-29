import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
  } from '@react-navigation/native';
import { RootStackParamList } from './scenes/RootScenes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params = {}): void {
    navigationRef.navigate(name, params);
}

export function goBack(): void {
    navigationRef.goBack();
}

export function navigateReplace(name: string, params = {}): void {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
  
  export function popToTop(): void {
    navigationRef.dispatch(StackActions.popToTop());
  }
  