import {ScrollView} from 'react-native-gesture-handler';
import {Themes} from '../../assets/themes';
import {StyledButton} from '../../components/base';
import {Colors} from '../../utils/Colors';
import VectorIcon from '../../utils/VectorIcon';
import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {reportPostRequest} from '../../api/modules/post';
import {SUCCESS_CODE} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import {store} from '../../state-management/redux/store';
import {postInfoActions} from '../../state-management/redux/slices/HomeListPost';

const ConfirmScreen = ({items, postId}) => {
  const [loading, setLoading] = React.useState(false);
  const {navigate} = useNavigation();
  const reportPostApi = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const {data} = await reportPostRequest({
        id: postId,
        subject: 'REPORT POST',
        details: items.join(', '),
      });

      if (data.code == SUCCESS_CODE.toString()) {
        navigate(APP_ROUTE.HOME_TAB);

        store.dispatch(postInfoActions.removePost({postId}));
      }
    } catch (error) {
      console.log('error report api:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.logo}>
            <VectorIcon
              name="report"
              type="Octicons"
              size={36}
              color={Colors.white}
            />
          </View>
          <Text
            style={{
              fontWeight: '700',
              color: Colors.black,
              fontSize: 20,
              paddingVertical: 8,
            }}>
            Bạn đã chọn
          </Text>
          <View style={{gap: 8}}>
            {items?.map(it => (
              <View
                key={it}
                style={{
                  backgroundColor: Colors.primaryColor,
                  flexDirection: 'row',
                  gap: 12,
                  borderRadius: 20,
                  padding: 10,
                }}>
                <VectorIcon
                  name="check"
                  type="AntDesign"
                  size={18}
                  color={Colors.white}
                />
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    color: Colors.white,
                  }}>
                  {it}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginHorizontal: 28,
              marginTop: 8,
              textAlign: 'center',
              paddingBottom: 20,
              borderBottomColor: Colors.borderGrey,
              borderBottomWidth: 1,
              borderStyle: 'solid',
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Bạn có thể báo cáo nếu cho rằng nột dung này vi phạm{' '}
              <Text style={{fontWeight: '600', color: Colors.black}}>
                Tiêu chuẩn cộng đồng{' '}
              </Text>
              của chúng tôi. Xin lưu ý rằng đột ngũ xét duyệt của chúng tôi hiện
              có ít nhân lực hơn.
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 24,
            color: Colors.black,
            fontSize: 16,
            fontWeight: '500',
            paddingHorizontal: 8,
          }}>
          Các bước khác mà bạn có thể thực hiện
        </Text>
        <View style={{marginVertical: 12, paddingHorizontal: 8}}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
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
                  Chặn Phạm
                </Text>
                <Text style={{fontSize: 15, width: '90%'}}>
                  Các bạn sẽ không thể nhìn thấy hoặc liên hệ với nhau
                </Text>
              </View>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
              paddingVertical: 12,
              width: '100%',
            }}>
            <>
              <VectorIcon
                name="x-circle"
                type="Feather"
                color={Colors.headerIconGrey}
                size={24}
              />
              <View style={{flexWrap: 'wrap'}}>
                <Text style={{color: Colors.black, fontSize: 18}}>
                  Bỏ theo dõi Phạm
                </Text>
                <Text style={{fontSize: 15}}>
                  Dừng xem bài viết nhưng vẫn là bạn bè
                </Text>
              </View>
            </>
          </TouchableHighlight>

          <StyledButton
            title={'Xong'}
            isLoading={loading}
            onPress={reportPostApi}
            customStyleText={{
              color: Colors.white,
              fontSize: 18,
            }}
            customStyle={{
              marginTop: 12,
              backgroundColor: Colors.primaryColor,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  logo: {
    backgroundColor: Themes.COLORS.yellow,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ConfirmScreen;
