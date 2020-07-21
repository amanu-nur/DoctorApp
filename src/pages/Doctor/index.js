import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import {Gap, HomeProfile, NewsItem} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, showError, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';

const Doctor = ({navigation}) => {
  const [data, setData] = useState([]);
  const ApiHealth =
    'http://newsapi.org/v2/top-headlines?country=id&apiKey=bd53b9de417b41dbbe9eedb128524d88';
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  // Api===================

  useEffect(() => {
    fetch(ApiHealth)
      .then((response) => response.json())
      .then((json) => {
        setData(json.articles);
      })
      .catch((error) => console.error(error));
  }, []);

  // ========================

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <NewsItem
                title={item.title}
                date={item.publishedAt}
                image={{uri: item.urlToImage}}
              />
            )}
          />
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {flexDirection: 'row'},
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
