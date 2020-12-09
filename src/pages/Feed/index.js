import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';


import api from '../../services/api'

import {Container, Post, Header, Avatar, Name, Description, Loading} from './styles'

export default function Feed() {

  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  async function loadPage(){
    setLoading(true)

    const { data } = await api.get('/feed?_expand=author')
    

    setLoading(false)

    setFeed(data)
  }

  useEffect(() => {
    loadPage()
  }, [])


  async function refreshList(){
    setRefreshing(true)

    await loadPage()

    setRefreshing(false)
  }

  return (
      <Container>
          <FlatList 
            key="list" 
            data={feed} 
            keyExtractor={(item) => String(item.id)} 
            viewabilityConfig={{ 
              viewAreaCoveragePercentThreshold: 10,

            }} 
            showsVerticalScrollIndicator={false}
            onRefresh={refreshList}
            refreshing={refreshing}
            renderItem={({item}) => (
              <Post>
                <Header>
                  <Avatar source={{ uri: item.author.avatar }} />
                  <Name>{item.author.name}</Name>
                </Header>

                <Description>
                  <Name>{item.author.name}</Name> {item.description}
                </Description>

              </Post>
            )}
          />
      </Container>
  );
};

