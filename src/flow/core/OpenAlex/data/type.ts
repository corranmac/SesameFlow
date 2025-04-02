// Create a utility function to inspect types
import { type dcMetadata_4_6 } from "@flowcore/data-cite/metadata";
// Safe type inspection function
/**
 * TypeScript Type Explorer
 * This creates a visualization of your type structure.
 */
function exploreTypeStructure<T>() {
    // For IDE visualization (hover to see type)
    type Primitive = string | number | boolean | null | undefined;
    
    // Fixed depth exploration to avoid recursion issues
    type Level1<T> = {
      [K in keyof T]: T[K] extends Primitive ? T[K] : 
                        T[K] extends any[] ? `Array<${string}>` : 
                        `Object<${string}>`
    };
    
    type Level2<T> = {
      [K in keyof T]: T[K] extends Primitive ? T[K] : 
                        T[K] extends (infer U)[] ? Array<Level1<U>> :
                        T[K] extends object ? Level1<T[K]> : 
                        T[K]
    };
    
    // Limits recursion to 3 levels, which is enough for most types
    type TypeStructure = Level2<T>;
    
    // For IDE visualization - hover over this
    const structure: TypeStructure = null as any;
    
    // You might also add runtime functions to print type props
    return {
      // This returns keys at the top level only
      getKeys: () => Object.keys({} as T) as (keyof T)[],
      getType: () => typeof {} as T,
    };
  }
  
  export function inspectType(){
    console.log(exploreTypeStructure<dcMetadata_4_6>())
  }

