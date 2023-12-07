import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
  import {StyleSheet,Text,Pressable,ScrollView,View,Image,RefreshControl} from 'react-native';
import React,{useState,useEffect} from 'react';
import HeaderSearch from '../layouts/HeaderSearch';
import {useSelector} from 'react-redux';
import { getListBlocksRequest } from '../../api/modules/block.request';
import {useScrollHanler} from '../../hooks/useScrollHandler';
import AlertMessage from '../../components/base/AlertMessage';
import { err } from 'react-native-svg/lib/typescript/xml';
import {Colors} from '../../utils/Colors';
import Loading from '../../components/base/Loading';
import FriendCard from '../../components/friends/FriendCard';
import BlockCard from './BlockCard';


const BlockScreen=({route})=>{

const {goBack} = useNavigation();
const {user} = route.params;
const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );

const [blockList,setBlockList] = useState([]);
const [params,setParams]  = useState({
    index:'0',
    count:'20',
})
const [total,setTotal] = useState('0');
const isOwner = React.useMemo(
    () => user.id === userLogged.id,
    [user, userLogged],
  );

  const GetBlockList = async ()=>{
    try{
        setIsLoadMore(true);
        const {data} = await getListBlocksRequest(params);
        console.log({"d":data.data});
        setBlockList(data.data);
    }catch(error){
        console.log({error});
        AlertMessage('Có lỗi xảy ra. Vui lòng thử lại!');
    }finally{
        setIsLoadMore(false);
    }
  }


  const {handleScroll, onRefresh, isLoadMore, refreshing, setIsLoadMore} =
  useScrollHanler(reload, loadMore);
const reload = () => {
  if (refreshing) return;
  setParams({
    index: '0',
    count: '20',
  });
};
const loadMore = () => {
  if (isLoadMore) return;
  setParams({
    index: (Number(params.index) + 1).toString(),
    count: '20',
  });
};
useEffect(()=>{
   GetBlockList();
},[params,user]);

    return (
        <View>
            <HeaderSearch title={isOwner?'BlockList':user.userName}
            onBack={goBack}/>

            <ScrollView
        onScroll={handleScroll}
        style={styles.container}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginTop: 12,
          }}>
          {/* <TouchableHighlight>
            <Text style={{color: Colors.primaryColor, fontSize: 16}}>
              Sắp xếp
            </Text>
          </TouchableHighlight> */}
        </View>
        {console.log({"s":blockList})}
        {blockList.length > 0 ? (
          blockList.map(fr => <BlockCard key={fr.id} fr={fr} />)
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, paddingHorizontal: 16}}>
              Danh sách trống.
            </Text>
          </View>
        )}
        {isLoadMore && <Loading />}
      </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {   
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 4,
      borderBottomColor: Colors.borderGrey,
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
    titleText: {
      fontWeight: '700',
      fontSize: 20,
      color: Colors.black,
    },
  });
  
export default BlockScreen;