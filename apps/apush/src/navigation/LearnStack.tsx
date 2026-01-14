import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { LearnStackParamList } from './types';
import { UnitDetailScreen } from '../screens/UnitDetailScreen';
import { UnitsScreen } from '../screens/UnitsScreen';

const Stack = createNativeStackNavigator<LearnStackParamList>();

export function LearnStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Units" component={UnitsScreen} options={{ title: 'APUSH' }} />
      <Stack.Screen name="UnitDetail" component={UnitDetailScreen} options={{ title: 'Unit' }} />
    </Stack.Navigator>
  );
}

