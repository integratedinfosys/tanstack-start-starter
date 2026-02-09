import z from "zod";

export enum difficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export const difficultyConfig = {
  EASY: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Easy",
  },
  MEDIUM: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Medium",
  },
  HARD: {
    color: "bg-red-100 text-red-800 border-red-200",
    label: "Hard",
  },
};

export type Recipe = {
  id: string;
  title: string | null;
  createdAt: Date;
  overview: string | null;
  ingredients: string[];
  steps: string[];
  difficulty: difficultyLevel | null;
  cookTime: number | null;
  isPublic: boolean;
  authorId: string;
};

export type RecipeInput = Omit<
  Recipe,
  "id" | "authorId" | "createdAt" | "updatedAt" | "isPublic"
>;

export const recipeInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(40, 'Should be less than 40 characters'),
  overview: z.string().max(250, 'Should be less than 250 characters').optional().nullable(),
  ingredients: z.array(z.string().max(40, 'Should be less than 40 characters')),
  steps: z.array(z.string().max(40, 'Should be less than 40 characters')),
  difficulty: z.array(z.string()).parse(Object.keys(difficultyLevel)),
  //Object.keys Object.values
  cookTime: z.number().max(3600).nonnegative()
});