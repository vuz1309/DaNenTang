import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useMemo} from 'react';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {StyledButton} from '../../components/base';
import ConfirmScreen from './ConfirmScreen';
import {setBlockRequest} from '../../api/modules/block.request';
import {useNavigation} from '@react-navigation/native';

const reportOptions = [
  'Ảnh khỏa thân',
  'Bạo lực',
  'Quấy rối',
  'Tự tử/Tự gây thương tích',
  'Tin giả',
  'Spam',
  'Bán hàng trái phép',
  'Ngôn từ gây đả kích',
  'Khủng bố',
];

const OptionItem = ({opt, chooseReportItem, isChoosed}) => {
  const bgColor = React.useMemo(
    () => (isChoosed ? Colors.primaryColor : Colors.lightgrey),
    [isChoosed],
  );
  const textColor = React.useMemo(
    () => (isChoosed ? Colors.white : Colors.black),
    [isChoosed],
  );

  return (
    <TouchableHighlight
      onPress={() => chooseReportItem(opt)}
      underlayColor={Colors.background}
      style={{
        backgroundColor: bgColor,

        borderRadius: 20,
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 15,
          color: textColor,
        }}>
        {opt}
      </Text>
    </TouchableHighlight>
  );
};
const ReportScreen = ({navigation, route}) => {
  const {postId} = route.params;
  const {author} = route.params;
  // const {goBack} = useNavigation();
  const [isContinue, setContinue] = React.useState(false);
  const [reportOptionsChoosed, setOptionsChoosed] = React.useState({});
  const chooseReportItem = opt => {
    setOptionsChoosed(prev => ({
      ...prev,
      [opt]: !prev[opt],
    }));
  };
  const handleBlock = async () => {
    try {
      const {data} = await setBlockRequest({user_id: author.id});
      // console.log(data);
      ToastAndroid.show('Block thành công ' + author.name, ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const items = React.useMemo(() => {
    return Object.keys(reportOptionsChoosed).filter(
      key => reportOptionsChoosed[key],
    );
  }, [reportOptionsChoosed]);
  const isDisableBtn = React.useMemo(() => {
    return items.length === 0;
  }, [reportOptionsChoosed]);
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          padding: 8,
          borderBottomColor: Colors.borderGrey,
          borderStyle: 'solid',
          borderBottomWidth: 1,
        }}>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            name="close"
            type="AntDesign"
            size={24}
            color={Colors.grey}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{
          marginTop: 8,
          paddingBottom: 16,
          paddingHorizontal: 4,
          borderBottomColor: Colors.borderGrey,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          gap: 4,
        }}>
        <Text style={{color: Colors.black, fontSize: 20, fontWeight: '700'}}>
          Vui lòng chọn vấn đề để tiếp tục
        </Text>
        <Text style={{fontSize: 15}}>
          Bạn có thể báo cáo bài viết sau khi chọn vấn đề
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 16,
          }}>
          {reportOptions.map(opt => (
            <OptionItem
              opt={opt}
              key={opt}
              isChoosed={reportOptionsChoosed[opt]}
              chooseReportItem={chooseReportItem}
            />
          ))}
          <TouchableHighlight
            onPress={() =>
              setOptionsChoosed(prev => ({...prev, Khác: !prev['Khác']}))
            }
            underlayColor={Colors.background}
            style={{
              backgroundColor: reportOptionsChoosed['Khác']
                ? Colors.primaryColor
                : Colors.lightgrey,
              borderRadius: 20,
              padding: 10,
              flexDirection: 'row',
            }}>
            <>
              <VectorIcon
                name="search"
                type="EvilIcons"
                size={24}
                color={
                  reportOptionsChoosed['Khác'] ? Colors.white : Colors.black
                }
              />
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  color: reportOptionsChoosed['Khác']
                    ? Colors.white
                    : Colors.black,
                }}>
                Vấn đề khác
              </Text>
            </>
          </TouchableHighlight>
        </View>
      </View>
      <View
        style={{
          marginTop: 16,
          paddingHorizontal: 4,
        }}>
        <Text style={{color: Colors.black, fontSize: 16, fontWeight: '500'}}>
          Các bước khác mà bạn có thể thực hiện
        </Text>
        <View style={{marginTop: 12}}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            onPress={handleBlock}
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
              paddingVertical: 12,
              width: '100%',
            }}>
            <>
              <VectorIcon
                name="user-x"
                color={Colors.headerIconGrey}
                type="Feather"
                size={24}
              />

              <View style={{flexWrap: 'wrap'}}>
                <Text style={{color: Colors.black, fontSize: 18}}>
                  Chặn {author.name}
                </Text>
                <Text
                  style={{fontSize: 15, width: '90%', color: Colors.textGrey}}>
                  Các bạn sẽ không thể nhìn thấy hoặc liên hệ với nhau
                </Text>
              </View>
            </>
          </TouchableHighlight>
        </View>
        <View style={{marginTop: 12}}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: Colors.borderGrey,
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 2,
              paddingVertical: 12,
              gap: 4,
            }}>
            <View style={{paddingHorizontal: 8, justifyContent: 'center'}}>
              <VectorIcon
                name="info-circle"
                type="FontAwesome5"
                size={26}
                color={Colors.headerIconGrey}
              />
            </View>
            <Text
              style={{
                flex: 1,
                paddingRight: 12,
                fontSize: 15,
                color: Colors.textGrey,
              }}>
              Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy
              báo ngay cho dịch vụ cấp cứu tại địa phương
            </Text>
          </View>
        </View>
        <StyledButton
          onPress={() => setContinue(true)}
          title={'Tiếp'}
          customStyleText={{
            color: isDisableBtn ? Colors.textGrey : Colors.white,
            fontSize: 18,
          }}
          customStyle={{
            marginTop: 12,
            backgroundColor: isDisableBtn
              ? Colors.lightgrey
              : Colors.primaryColor,
          }}
          disabled={isDisableBtn}
        />
      </View>
      {isContinue && (
        <Modal
          onRequestClose={() => setContinue(false)}
          visible={true}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: Colors.white,
          }}>
          <ConfirmScreen postId={postId} items={items} />
        </Modal>
      )}
    </View>
  );
};

export default ReportScreen;
