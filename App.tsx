import * as React from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';
import FairmaticSDK, {
  type DriverAttributes,
  type FairmaticConfiguration,
  type FairmaticOperationResult,
  type FairmaticTripNotification,
} from 'react-native-fairmatic-sdk';

export default function App() {
  React.useEffect(() => {}, []);

  const handleUtility = (): void => {
    handleGetSDKBuildVersion();
  };
  const handleGetSDKBuildVersion = (): void => {
    FairmaticSDK.getBuildVersion().then((version) => {
      console.log('Build Version : ', version);
    });
  };

  const handleGetFairmaticSettings = (): void => {
    FairmaticSDK.getFairmaticSettings()
      .then((settings) => {
        console.log('Fairmatic Settings:', settings);    
        if (settings && settings.length > 0) {
          console.log('Detected Fairmatic Setting Errors:');
          settings.forEach((settingError) => {
            console.log(`- Error: ${settingError}`);
          });
        } else {
          console.log('No Fairmatic setting errors detected');
        }
      })
      .catch((error) => {
        console.error('Failed to get Fairmatic settings:', error);
      });
  };

  const handleWipeOut = (): void => {
    console.log('Wiping out Fairmatic SDK');
    FairmaticSDK.wipeOut()
      .then((result) => {
        if (result.isSuccess) console.log('wipeOut successful');
        else console.log('wipeOut failed because of ', result.errorMessage);
      })
      .catch((error) => {
        console.error('error wiping out', error);
      });
  };

  const handleSetup = (): void => {
    const driverAttributes: DriverAttributes = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    };

    const fairmaticNotification: FairmaticTripNotification = {
      title: 'Fairmatic Trip',
      content: 'Monitoring a trip',
      iconResourceName: 'fm_car',
    };

    // Replace with your SDK key
    const sdk_key = 'your_sdk_key_here';

    const fairmaticConfiguration: FairmaticConfiguration = {
      sdkKey: sdk_key,
      driverId: 'driverId',
      driverAttributes: driverAttributes,
      notification: fairmaticNotification,
    };

    FairmaticSDK.setup(fairmaticConfiguration)
      .then((result: FairmaticOperationResult) => {
        console.log('response: ', result);
        if (result.isSuccess) console.log('Setup Succesful');
        else console.log('Setup Failed because of ', result.errorMessage);
      })
      .catch((error: any) => {
        console.error('Error setting up Fairmatic SDK:', error);
      });
  };

  const handleStartPeriod1 = (): void => {
    const trackingId: string = 'p1-tracking-id';
    FairmaticSDK.startDriveWithPeriod1(trackingId)
      .then((result: FairmaticOperationResult) => {
        if (result.isSuccess) console.log('P1 drive started successfully');
        else console.log('Drive failed because of ', result.errorMessage);
      })
      .catch((error: any) => {
        console.error('Error starting P1 drive:', error);
      });
  };

  const handleStartPeriod2 = (): void => {
    const trackingId: string = 'p2-tracking-id';
    FairmaticSDK.startDriveWithPeriod2(trackingId)
      .then((result: FairmaticOperationResult) => {
        if (result.isSuccess) console.log('P2 drive started successfully');
        else console.log('Drive failed because of ', result.errorMessage);
      })
      .catch((error: any) => {
        console.error('Error starting P2 drive:', error);
      });
  };

  const handleStartPeriod3 = (): void => {
    const trackingId: string = 'p3-tracking-id';
    FairmaticSDK.startDriveWithPeriod3(trackingId)
      .then((result: FairmaticOperationResult) => {
        if (result.isSuccess) console.log('P3 drive started successfully');
        else console.log('Drive failed because of ', result.errorMessage);
      })
      .catch((error: any) => {
        console.error('Error starting P3 drive:', error);
      });
  };

  const handleStopPeriod = (): void => {
    FairmaticSDK.stopPeriod()
      .then((result: FairmaticOperationResult) => {
        if (result.isSuccess) console.log('Period stopped successfully');
        else console.log('Period stop failed because of ', result.errorMessage);
      })
      .catch((error: any) => {
        console.error('Error stopping period:', error);
      });
  };

  const handleTeardown = (): void => {
    FairmaticSDK.teardown()
      .then(() => {
        console.log('Teardown successful');
      })
      .catch((error: any) => {
        console.error('Error tearing down Fairmatic SDK:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fairmatic SDK React Native Sample</Text>
      <View style={styles.buttonContainer}>
        <Button title="Setup" onPress={handleSetup} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start Period 1" onPress={handleStartPeriod1} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start Period 2" onPress={handleStartPeriod2} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start Period 3" onPress={handleStartPeriod3} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Stop Period" onPress={handleStopPeriod} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Teardown" onPress={handleTeardown} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Wipe Out" onPress={handleWipeOut} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Get Settings" onPress={handleGetFairmaticSettings} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Utility Button" onPress={handleUtility} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});
