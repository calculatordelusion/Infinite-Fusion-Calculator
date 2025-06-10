"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { basePokemonIdName } from "@/data/hardcoded";
import { config, gameInfo } from "@/config";

import {
  FusionControls,
  FusionResult,
  FusionSelector,
} from "@/components/fusion";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { SelectedPokemon } from "@/types/fusion.types";
import { MultiSpriteApiResponse } from "@/types/sprite.types";
import { Pokemon } from "@/types";

const generateRandomId = (): string => {
  const maxPoke = gameInfo.totalPokemons;
  return (Math.floor(Math.random() * maxPoke) + 1).toString();
};

const fetchData = async (
  currentHeadId: string,
  currentBodyId: string,
): Promise<MultiSpriteApiResponse | null> => {
  const url = new URL(`${config.api.baseURL}/${config.api.endpoints.sprites}`);
  url.searchParams.append("id", currentHeadId + "." + currentBodyId);
  url.searchParams.append("id", currentBodyId + "." + currentHeadId);
  const res = await fetch(url);
  const data: MultiSpriteApiResponse = await res.json();
  return data;
};

export default function FusionPage() {
  // Selected Pokemon states
  const [headPokemon, setHeadPokemon] = useState<SelectedPokemon | null>(null);
  const [bodyPokemon, setBodyPokemon] = useState<SelectedPokemon | null>(null);

  // Currently fused Pokemon states
  const [fusedHeadPokemon, setFusedHeadPokemon] =
    useState<SelectedPokemon | null>(null);
  const [fusedBodyPokemon, setFusedBodyPokemon] =
    useState<SelectedPokemon | null>(null);

  // Fusion result states
  const [fusionData, setFusionData] = useState<Pokemon[] | null>(null);
  const [headData, setHeadData] = useState<Pokemon | null>(null);
  const [bodyData, setBodyData] = useState<Pokemon | null>(null);

  // UI states
  const [loading, setLoading] = useState<boolean>(false);
  const [fusionStatus, setFusionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const searchParams = useSearchParams();
  const toast = useToast();

  const handleSelectPokemon =
    (type: "head" | "body") => (id: string, name: string) => {
      if (type === "head") {
        setHeadPokemon({ id, name });
      } else {
        setBodyPokemon({ id, name });
      }
    };

  const calculateFusion = async (
    headId?: string,
    bodyId?: string,
  ): Promise<void> => {
    setLoading(true);
    setFusionStatus("loading");

    const currentHeadId = headId || headPokemon?.id;
    const currentBodyId = bodyId || bodyPokemon?.id;

    if (!currentHeadId || !currentBodyId) {
      toast.toast({
        title: "Selection Error",
        description:
          "Please select both a head and body Pokémon before fusing.",
        duration: 3000,
      });
      setLoading(false);
      setFusionStatus("idle");
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      params.set("headId", currentHeadId);
      params.set("bodyId", currentBodyId);

      window.history.replaceState(null, "", `?${params.toString()}`);

      const data = await fetchData(currentHeadId, currentBodyId);
      if (!data) {
        toast.toast({
          title: "Fusion Error",
          description: "Failed to load fusion data. Please try again later.",
          duration: 3000,
        });
        setFusionData(null);
        setFusionStatus("error");
      } else {
        // Update fusion data
        setFusionData(data.data.sprites);
        const fusionId = `${currentHeadId}.${currentBodyId}`;
        const reverseId = `${currentBodyId}.${currentHeadId}`;
        const head = data.data.sprites.find(
          (item) => item.sprite_id === fusionId,
        );
        const body = data.data.sprites.find(
          (item) => item.sprite_id === reverseId,
        );
        setHeadData(head || null);
        setBodyData(body || null);

        // Update fused Pokemon state
        setFusedHeadPokemon({
          id: currentHeadId,
          name: basePokemonIdName[currentHeadId],
        });
        setFusedBodyPokemon({
          id: currentBodyId,
          name: basePokemonIdName[currentBodyId],
        });

        setFusionStatus("success");
      }
    } catch (error) {
      toast.toast({
        title: "Fusion Error",
        description: "An unexpected error occurred. Please try again.",
        duration: 3000,
      });
      setFusionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const randomFusion = (): void => {
    const headId = generateRandomId();
    let bodyId = generateRandomId();

    while (headId === bodyId) {
      bodyId = generateRandomId();
    }

    setHeadPokemon({ id: headId, name: basePokemonIdName[headId] });
    setBodyPokemon({ id: bodyId, name: basePokemonIdName[bodyId] });
    calculateFusion(headId, bodyId);
  };

  const handleReset = (): void => {
    setHeadPokemon(null);
    setBodyPokemon(null);
    setFusedHeadPokemon(null);
    setFusedBodyPokemon(null);
    setFusionData(null);
    setHeadData(null);
    setBodyData(null);
    setFusionStatus("idle");
    window.history.replaceState(null, "", window.location.pathname);
  };

  useEffect(() => {
    const headId = searchParams?.get("headId");
    const bodyId = searchParams?.get("bodyId");

    if (headId && bodyId) {
      setHeadPokemon({ id: headId, name: basePokemonIdName[headId] });
      setBodyPokemon({ id: bodyId, name: basePokemonIdName[bodyId] });
      calculateFusion(headId, bodyId);
    } else {
      const headId = generateRandomId();
      let bodyId = generateRandomId();

      while (headId === bodyId) {
        bodyId = generateRandomId();
      }

      setHeadPokemon({ id: headId, name: basePokemonIdName[headId] });
      setBodyPokemon({ id: bodyId, name: basePokemonIdName[bodyId] });
    }
  }, []);

  return (
    <>
      <FusionSelector
        headPokemon={headPokemon}
        bodyPokemon={bodyPokemon}
        handleSelectPokemon={handleSelectPokemon}
        randomHead={() => {
          const headId = generateRandomId();
          setHeadPokemon({ id: headId, name: basePokemonIdName[headId] });
          if (bodyPokemon) calculateFusion(headId, bodyPokemon.id);
        }}
        randomBody={() => {
          const bodyId = generateRandomId();
          setBodyPokemon({ id: bodyId, name: basePokemonIdName[bodyId] });
          if (headPokemon) calculateFusion(headPokemon.id, bodyId);
        }}
      />

      <FusionControls
        loading={loading}
        headPokemon={headPokemon}
        bodyPokemon={bodyPokemon}
        fusedHeadPokemon={fusedHeadPokemon}
        fusedBodyPokemon={fusedBodyPokemon}
        fusionStatus={fusionStatus}
        onFuse={() => calculateFusion()}
        onRandom={randomFusion}
        onReset={handleReset}
      />

      <FusionResult
        fusionStatus={fusionStatus}
        headData={headData}
        bodyData={bodyData}
      />

      <Separator />
    </>
  );
}
