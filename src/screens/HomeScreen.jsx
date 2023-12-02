import {StyleSheet, View, Text, RefreshControl, ScrollView, Modal} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';
import Post from '../components/posts/Post';

// import {ScrollView} from 'react-native-gesture-handler';

import {getListPost} from '../api/modules/post';
import {useSelector} from 'react-redux';

import {useScrollHanler} from '../hooks/useScrollHandler';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import Loading from '../components/base/Loading';
import UploadScreen from "./UploadScreen";

const HomeScreen = () => {
    const userLogged = useSelector(state => state.userInfo.user);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log(isModalVisible)
    };
    const listPosts = useSelector(state => state.postInfo.posts);
    const params = useSelector(state => state.postInfo.paramsConfig);

    const getListPostsApi = async () => {
        try {
            const {data} = await getListPost({...params, user_id: userLogged.id});

            if (JSON.parse(data.data.last_id)) {
                store.dispatch(postInfoActions.setLastId(data.data.last_id));
            }

            if (params.index === '0') {
                store.dispatch(postInfoActions.setPosts(data.data.post));
            } else if (data.data.post.length > 0) {
                store.dispatch(postInfoActions.addPosts(data.data.post));
            }
        } catch (error) {
            console.log('load data error', error);
        } finally {
            setRefreshing(false);
            setIsLoadMore(false);
        }
    };

    const reload = () => {
        if (refreshing) return;
        setRefreshing(true);
        store.dispatch(
            postInfoActions.setParams({
                user_id: '',
                in_campaign: '1',
                campaign_id: '1',
                latitude: '1.0',
                longitude: '1.0',
                last_id: '1',
                index: '0',
                count: '20',
            }),
        );

        store.dispatch(postInfoActions.setLastId('1'));
    };

    const loadMore = () => {
        if (isLoadMore) return;
        setIsLoadMore(true);
        store.dispatch(
            postInfoActions.setParams({
                ...params,
                index: (Number(params.index) + 1).toString(),
                last_id: store.getState().postInfo.lastId,
            }),
        );
    };
    const {handleScroll, isLoadMore, setIsLoadMore, refreshing, setRefreshing} =
        useScrollHanler(reload, loadMore);
    React.useEffect(() => {
        getListPostsApi();
    }, [params]);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.homeContainer}
            onScroll={handleScroll}
            refreshControl={
                <RefreshControl
                    colors={[Colors.primaryColor]}
                    refreshing={refreshing}
                    onRefresh={reload}
                />
            }>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
            >
                <UploadScreen
                    onClose={()=>toggleModal()}
                    title={'upload'}
                ></UploadScreen>
            </Modal>
            <SubHeader onClick={()=>toggleModal()}/>
            <Stories/>
            <Post listPost={listPosts}/>
            {isLoadMore && <Loading/>}
            <View
                style={{
                    height: 10,
                    backgroundColor: Colors.background,
                    width: '100%',
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: Colors.background,
        flex: 1,
    },
});

export default HomeScreen;
