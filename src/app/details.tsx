import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";


export default function Details() {
 
    const params = useLocalSearchParams()
    console.log('====================================');
    console.log(params);
    console.log('====================================');
  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      
    </ScrollView>
  );
}
