import React from "react";
import { calculateTypeEffectiveness } from "@/utils";
import { Card } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Image from "next/image";

interface Types {
  headTypes: string[];
  bodyTypes: string[];
}

function FusionWeaknesses({ types }: { types: Types }) {
  // Calculate the weaknesses for both head and body
  const HeadWeaknesses = calculateTypeEffectiveness(types.headTypes, true);
  const BodyWeaknesses = calculateTypeEffectiveness(types.bodyTypes, true);

  return (
    <Card className="p-0">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={7} className="text-center">
              Weaknesses
            </TableHead>
          </TableRow>
          {/* <TableRow>
            <TableHead colSpan={3} className="w-[45%] text-center">Head</TableHead>
            <TableHead className="w-[10%] text-center whitespace-nowrap">
              <span className="sm:inline hidden">Multiplier</span>
              <span className="inline sm:hidden">x</span>
            </TableHead>
            <TableHead colSpan={3} className="w-[45%] text-center">Body</TableHead>
          </TableRow> */}
        </TableHeader>
        <TableBody>
          {Object.keys(HeadWeaknesses).map((multiplier) => (
            <TableRow key={multiplier}>
              {/* Head Weaknesses */}
              <TableCell colSpan={3} className="py-2 md:py-2 p-1">
                <div className="flex flex-wrap justify-center items-center gap-1">
                  {HeadWeaknesses[multiplier].map((type: string) => (
                    <Image
                      key={type}
                      src={`/images/type/${type.toLowerCase()}.png`}
                      className="rounded-sm w-14 sm:w-16 h-auto" // Adjusted widths for mobile and larger screens
                      alt={type}
                      width={96}
                      height={32}
                    />
                  ))}
                </div>
              </TableCell>

              {/* Multiplier */}
              <TableCell className="py-2 md:py-2 p-1 text-center">
                {multiplier === "2"
                  ? "x2"
                  : multiplier === "1"
                    ? "x1"
                    : multiplier === "0.5"
                      ? "x0.5"
                      : multiplier === "0.25"
                        ? "x0.25"
                        : multiplier}
              </TableCell>

              {/* Body Weaknesses */}
              <TableCell colSpan={3} className="py-2 md:py-2 p-1">
                <div className="flex flex-wrap justify-center items-center gap-1">
                  {BodyWeaknesses[multiplier]?.map((type: string) => (
                    <Image
                      key={type}
                      src={`/images/type/${type.toLowerCase()}.png`}
                      className="rounded-sm w-14 sm:w-16 h-auto" // Adjusted widths for mobile and larger screens
                      alt={type}
                      width={96}
                      height={32}
                    />
                  )) || <span className="text-muted-foreground">N/A</span>}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export { FusionWeaknesses };
