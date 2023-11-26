import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import PostHeader from "./posts/PostHeader";
import PostFooter from "./posts/PostFooter";


const Post = ({data}) => {
    return (
        <View style={styles.postContainer}>
            {data.map(item => (
                <View key={item.id} style={{
                    borderColor:Colors.background,
                    borderTopWidth:10
                }}>
                    <PostHeader data={item}/>
                    <Image source={item.postImg} style={styles.postImg}/>
                    <PostFooter data={item}/>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: Colors.white,
        marginTop: 8,
    },
    postImg: {
        width: '100%',
        height: 250,
    },
});

export default Post;
