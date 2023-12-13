export function convertTimeToFacebookStyle(inputTime) {
  const inputDate = new Date(inputTime);
  const currentDate = new Date();
  const timeDifference = currentDate - inputDate;
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `Vừa xong`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} phút trước`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} giờ trước`;
  } else if (secondsDifference < 604800) {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} ngày trước`;
  } else if (secondsDifference < 2419200) {
    const weeksDifference = Math.floor(secondsDifference / 604800);
    return `${weeksDifference} tuần trước`;
  } else if (secondsDifference < 29030400) {
    const monthsDifference = Math.floor(secondsDifference / 2419200);
    return `${monthsDifference} tháng trước`;
  } else {
    const yearsDifference = Math.floor(secondsDifference / 29030400);
    return `${yearsDifference} năm trước`;
  }
}

/**
 * Format number về dạng phân cách để dễ nhìn, VD: 1000 -> 1.000
 * @author NTVu
 * @param {Number} number
 * @param {String} splitBy
 */
export function formatNumberSplitBy(number, splitBy = '.') {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, splitBy);
}

import {Platform} from 'react-native';
export function createImageFormData(img) {
  return {
    name: img.fileName,
    type: img.type,
    uri: Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri,
  };
}
export function createVideoFormData(vid) {
  return {
    name: vid.fileName,
    type: vid.type,
    uri: Platform.OS === 'ios' ? vid.uri.replace('file://', '') : vid.uri,
  };
}