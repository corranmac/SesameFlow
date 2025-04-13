
import React, { createContext, useContext, useState } from 'react';

// 1. Create a context for your functions
interface AppContext {
  onCreateNode: () => void;
  nodeTypes: any;
  recentNodeTypes: any;
}

export const AppContext = createContext<AppContext | undefined>(undefined);