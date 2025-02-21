"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LevelUpMove, DetailedMove } from "@/types/species.types";

interface MovesTableProps {
  levelUpMoves: LevelUpMove[];
  eggMoves: DetailedMove[];
  tutorMoves: DetailedMove[];
}

const MoveRow: React.FC<{
  move: LevelUpMove | DetailedMove;
  showLevel?: boolean;
}> = ({ move, showLevel = false }) => {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">
        {move.real_name}
        {showLevel && (move as LevelUpMove).level !== 0 && (
          <span className="ml-2 text-muted-foreground text-sm">
            Lv. {(move as LevelUpMove).level}
          </span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Image
            src={`/images/type/${move.type.toLowerCase()}.png`}
            className="rounded-sm"
            alt={move.type}
            width={64}
            height={16}
          />
        </div>
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
  ${
    move.category === 0
      ? "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-100"
      : move.category === 1
        ? "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
        : "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
  }`}
        >
          {move.category === 0
            ? "Physical"
            : move.category === 1
              ? "Special"
              : "Status"}
        </span>
      </TableCell>
      <TableCell className="text-center">{move.base_damage || "-"}</TableCell>
      <TableCell className="text-center">{move.accuracy || "-"}</TableCell>
      <TableCell className="text-center">{move.total_pp}</TableCell>
      <TableCell className="max-w-md">
        <p className="text-muted-foreground text-sm">{move.real_description}</p>
      </TableCell>
    </TableRow>
  );
};

const MoveCard: React.FC<{
  move: LevelUpMove | DetailedMove;
  showLevel?: boolean;
}> = ({ move, showLevel = false }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-lg">
            {move.real_name}
            {showLevel &&
            (move as LevelUpMove).level && (
              <span className="ml-2 text-muted-foreground text-sm">
                Lv. {(move as LevelUpMove).level}
              </span>
            )}
          </h4>
          <div className="flex items-center space-x-2">
            <Image
              src={`/images/type/${move.type.toLowerCase()}.png`}
              className="rounded-sm"
              alt={move.type}
              width={64}
              height={16}
            />
          </div>
        </div>
        <div className="gap-2 grid grid-cols-3 my-2 text-sm">
          <div className="space-y-2">
            <p className="font-medium">Category</p>
            <p>
              {" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
  ${
    move.category === 0
      ? "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-100"
      : move.category === 1
        ? "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
        : "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
  }`}
              >
                {move.category === 0
                  ? "Physical"
                  : move.category === 1
                    ? "Special"
                    : "Status"}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Power</p>
            <p>{move.base_damage || "-"}</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Accuracy</p>
            <p>{move.accuracy || "-"}</p>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground text-sm">
          {move.real_description}
        </p>
      </CardContent>
    </Card>
  );
};

export const MovesTable: React.FC<MovesTableProps> = ({
  levelUpMoves,
  eggMoves,
  tutorMoves,
}) => {
  const [activeTab, setActiveTab] = useState("levelUp");

  const renderTable = (
    moves: (LevelUpMove | DetailedMove)[],
    showLevel: boolean,
  ) => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Move</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className="text-center">Power</TableHead>
            <TableHead className="text-center">Accuracy</TableHead>
            <TableHead className="text-center">PP</TableHead>
            <TableHead>Effect</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {moves.map((move, index) => (
            <MoveRow key={index} move={move} showLevel={showLevel} />
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderCards = (
    moves: (LevelUpMove | DetailedMove)[],
    showLevel: boolean,
  ) => (
    <div className="md:hidden">
      <ScrollArea className="h-[calc(100vh-200px)]">
        {moves.map((move, index) => (
          <MoveCard key={index} move={move} showLevel={showLevel} />
        ))}
      </ScrollArea>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="p-2 font-bold text-muted-foreground text-center">
        Moves
      </CardHeader>
      <CardContent className="p-2 md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger
              value="levelUp"
              className="data-[state=active]:bg-accent hover:bg-primary/70 font-medium text-sm text-accent-foreground hover:text-accent-foreground"
            >
              Level Up
            </TabsTrigger>
            <TabsTrigger
              value="egg"
              className="data-[state=active]:bg-accent hover:bg-primary/70 font-medium text-sm text-accent-foreground hover:text-accent-foreground"
            >
              Egg
            </TabsTrigger>
            <TabsTrigger
              value="tutor"
              className="data-[state=active]:bg-accent hover:bg-primary/70 font-medium text-sm text-accent-foreground hover:text-accent-foreground"
            >
              Tutor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="levelUp">
            {renderTable(levelUpMoves, true)}
            {renderCards(levelUpMoves, true)}
          </TabsContent>
          <TabsContent value="egg">
            {renderTable(eggMoves, false)}
            {renderCards(eggMoves, false)}
          </TabsContent>
          <TabsContent value="tutor">
            {renderTable(tutorMoves, false)}
            {renderCards(tutorMoves, false)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
