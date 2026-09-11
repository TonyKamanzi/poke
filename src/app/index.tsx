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

  const colorsByType: Record<string, string> = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      {pokes.map((poke) => {
        const typeName = poke.types[0]?.type.name;
        const backgroundColor = `${colorsByType[typeName ?? ""] ?? "#fff"}50`;

        return (
          <View
            key={poke.name}
            style={{
              backgroundColor,
              borderRadius: 8,
              padding: 20,
            }}
          >
            <Text className="font-bold text-[28px] text-center">
              {poke.name}
            </Text>
            <View className="items-center p-4">
              <Text className="mb-2 font-semibold text-center text-gray-600">
                {poke.types[0]?.type.name}
              </Text>
              <View className="flex-row justify-center">
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
          </View>
        );
      })}
    </ScrollView>
  );
}
