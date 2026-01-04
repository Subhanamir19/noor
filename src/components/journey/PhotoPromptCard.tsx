import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  onPhotoSelected: (uri: string) => Promise<void>;
  alreadyCapturedToday: boolean;
}

export function PhotoPromptCard({ onPhotoSelected, alreadyCapturedToday }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async (): Promise<boolean> => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Please enable camera and photo library access to capture moments.'
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    if (alreadyCapturedToday) {
      Alert.alert('Already captured!', 'You already added a photo today 💚');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        await onPhotoSelected(result.assets[0].uri);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePickFromGallery = async () => {
    if (alreadyCapturedToday) {
      Alert.alert('Already captured!', 'You already added a photo today 💚');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        await onPhotoSelected(result.assets[0].uri);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
      setIsLoading(false);
    }
  };

  if (alreadyCapturedToday) {
    return (
      <View className="bg-sage/30 border-2 border-emerald rounded-2xl p-5 mb-4">
        <View className="items-center">
          <Text className="text-4xl mb-2">✅</Text>
          <Text className="text-lg font-poppinsSemiBold text-emerald text-center">
            Today's Moment Captured!
          </Text>
          <Text className="text-sm font-interRegular text-warmGray text-center mt-2">
            See you tomorrow for another beautiful day 💚
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white border-2 border-blush rounded-2xl p-5 mb-4">
      <Text className="text-lg font-poppinsSemiBold text-teal text-center mb-4">
        Capture Today's Moment
      </Text>

      {isLoading ? (
        <View className="py-4">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="text-center text-warmGray mt-2 font-interRegular">
            Saving...
          </Text>
        </View>
      ) : (
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-1 bg-emerald rounded-xl py-3 mr-2"
            onPress={handleTakePhoto}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-interMedium">
              Take Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-sage border-2 border-emerald rounded-xl py-3 ml-2"
            onPress={handlePickFromGallery}
            activeOpacity={0.8}
          >
            <Text className="text-emerald text-center font-interMedium">
              From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
