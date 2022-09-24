import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CheckBox from '@react-native-community/checkbox';

const ContactInfoScreen = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Header */}
      <View className="flex-1 px-10 pt-5 justify-between pb-3 bg-white">
        <Text className="text-primary font-NunitoBold text-2xl">
          Almost there...
        </Text>
        <Text className="text-primary font-NunitoBold text-xl text-center">
          Set-Up your Profile
        </Text>
      </View>
      {/* Content */}
      <View className="flex-1 bg-primary items-center pt-8 px-10">
        <View className="w-full mt-5">
          <CustomTextInput title={'Address'} />
          <CustomTextInput title={'Contact Number'} />
          <CustomTextInput title={'Email'} />
          <View className="flex-row space-x-2">
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={toggle => setToggleCheckBox(toggle)}
              tintColors={{true: 'white', false: 'white'}}
              style={{top: 5}}
            />
            <Text className="font-PoppinsRegular text-[10px] text-white text-left mt-4 pr-10">
              By prividing your personal and contact information you agree on
              the
              <Text className="font-PoppinsBold"> Terms of Use </Text>
              and
              <Text className="font-PoppinsBold"> Privacy Policy </Text> of the
              App.
            </Text>
          </View>
          <View className="flex-1 justify-end mt-10">
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactInfoScreen')}
              className="mt-4 rounded-3xl bg-white justify-center items-center py-3 mx-10">
              <Text className="text-primary text-2xl font-NunitoBold">
                Confirm
              </Text>
            </TouchableOpacity>
            <Text className="text-right font-NunitoBold text-2xl text-white mt-10">
              Skip
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactInfoScreen;

const styles = StyleSheet.create({});
