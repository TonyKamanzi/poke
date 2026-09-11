import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
 types: PokemonType[];
}

interface PokemonType {

  type: {
    name: string;
    url: string;
  };
}

export default function HomeScreen() {
  const [pokes, setPokes] = useState<Pokemon[]>([]);

  const fetchPoke = async () => {
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );

      // fetch detailed information for each Pokemon
      const detailedPokes = await Promise.all(
        res.data.results.map(async (poke: any) => {
          const pokeRes = await axios.get(poke.url);
          return {
            name: poke.name,
            image: pokeRes.data.sprites.front_default,
            imageBack: pokeRes.data.sprites.back_default,
            types: pokeRes.data.types,
          };
        }),
      );
      setPokes(detailedPokes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPoke();
  }, []);

  return (
    <ScrollView>
      {pokes.map((poke) => (
        <View key={poke.name}>
          <Text className="">{poke.name}</Text>
          <Text className="">{ poke.types[0]?.type.name }</Text>
          <View className="flex-row justify-center items-center p-4
          ">
            <Image
              source={{ uri: poke.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: poke.imageBack }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
