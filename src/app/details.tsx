import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface PokemonDetail {
  name: string;
  image: string;
  imageBack: string;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export default function Details() {
  const params = useLocalSearchParams();
  const [poke, setPoke] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const fetchPokeDetails = async () => {
      const name = typeof params.name === "string" ? params.name : "";

      if (!name) {
        return;
      }

      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        );
        const data = res.data;

        setPoke({
          name: data.name,
          image: data.sprites.front_default,
          imageBack: data.sprites.back_default,
          types: data.types,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          stats: data.stats,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokeDetails();
  }, [params.name]);

  if (!poke) {
    return (
      <>
        <Stack.Screen options={{ title: "Loading..." }} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-semibold text-gray-600">
            Loading details...
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: poke.name,
        }}
      />

      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        <View className="rounded-2xl bg-white/60 p-5 shadow-sm">
          <Text className="text-center text-3xl font-bold capitalize">
            {poke.name}
          </Text>

          <View className="mt-4 flex-row justify-center gap-3">
            {poke.image ? (
              <Image
                source={{ uri: poke.image }}
                style={{ width: 150, height: 150 }}
              />
            ) : null}
            {poke.imageBack ? (
              <Image
                source={{ uri: poke.imageBack }}
                style={{ width: 150, height: 150 }}
              />
            ) : null}
          </View>

          <View className="mt-4 flex-row flex-wrap justify-center gap-2">
            {poke.types.map((type) => (
              <Text
                key={type.type.name}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold capitalize text-gray-700"
              >
                {type.type.name}
              </Text>
            ))}
          </View>

          <View className="mt-6 gap-3">
            <View className="flex-row justify-between">
              <Text className="font-semibold text-gray-700">Height</Text>
              <Text className="text-gray-600">{poke.height / 10} m</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-gray-700">Weight</Text>
              <Text className="text-gray-600">{poke.weight / 10} kg</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-semibold text-gray-700">Abilities</Text>
              <Text className="text-right text-gray-600 capitalize">
                {poke.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </Text>
            </View>
          </View>
        </View>

        <View className="rounded-2xl bg-white/60 p-5 shadow-sm">
          <Text className="mb-3 text-xl font-bold">Base stats</Text>
          {poke.stats.map((stat) => (
            <View key={stat.stat.name} className="mb-3">
              <View className="mb-1 flex-row justify-between">
                <Text className="capitalize text-gray-700">
                  {stat.stat.name}
                </Text>
                <Text className="font-semibold text-gray-600">
                  {stat.base_stat}
                </Text>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-gray-200">
                <View
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
