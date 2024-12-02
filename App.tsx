import * as React from 'react';

import { StyleSheet, View, Button, Image, Text } from 'react-native';
import FairmaticSDK, {
  FairmaticCallbackEventKind,
  type DriverAttributes,
  type FairmaticConfiguration,
  type FairmaticOperationResult,
  type FairmaticNotificationSettings,
  type FairmaticNotificationConfig,
  type FairmaticCallbackEvent,
  FairmaticEventType,
} from 'react-native-fairmatic-sdk';

const handleEvent = (event: FairmaticCallbackEvent): void => {
  console.log('Callback received from Fairmatic SDK in App.js:');
  // Handle different actions based on the event type
  switch (event.kind) {
    case FairmaticCallbackEventKind.ON_DRIVE_START:
      console.log('Converted Drive Start Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_DRIVE_END:
      console.log('Converted Drive End Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_DRIVE_RESUME:
      console.log('Converted Drive Resume Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_DRIVE_ANALYZED:
      console.log('Converted Drive Analyzed Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_ACCIDENT:
      console.log('Converted Accident Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_POTENTIAL_ACCIDENT:
      console.log('Converted Potential Accident Data in App.js:', event.event);
      break;
    case FairmaticCallbackEventKind.ON_SETTINGS_CHANGED:
      console.log('Converted OnSettingeChanged Data in App.js:', event.event);
      break;
    // Handle other event types as needed
    default:
      console.log('Unknown event type:', event.kind);
      break;
  }
};

interface ResolvedAssetSource {
  uri: string;
}

async function loadImage() {
  // try {
  //   const imageUri = (
  //     Image.resolveAssetSource(
  //       require('./assets/alarm.png')
  //     ) as ResolvedAssetSource
  //   ).uri;
  //   return imageUri;
  // } catch (error) {
  //   console.error('Error loading image from assets:', error);
  //   throw error;
  // }
}

async function createNotifications(): Promise<FairmaticNotificationSettings> {
  const imageUri = await loadImage();
  console.log('Base64 Image:', imageUri);
  const maybeInDriveNotificationConfig: FairmaticNotificationConfig = {
    title: 'Fairmatic MaybeInDrive',
    description: 'State is Maybe In Drive',
    path: imageUri,
  };
  const inDriveNotificationConfig: FairmaticNotificationConfig = {
    title: 'Fairmatic InDrive',
    description: 'State is In Drive',
    path: imageUri,
  };
  return {
    maybeInDriveNotificationConfig: maybeInDriveNotificationConfig,
    inDriveNotificationConfig: inDriveNotificationConfig,
  };
}

export default function App() {
  React.useEffect(() => {}, []);

  const handleGetEventTypes = (): void => {
    FairmaticSDK.getEventSupportForDevice().then(
      (map: Map<FairmaticEventType, Boolean>) => {
        console.log('Map : ', map);
      }
    );
  };

  const handleGetFairmaticSettings = (): void => {
    FairmaticSDK.getFairmaticSettings().then((settings) => {
      console.log('Settings : ', settings);
    });
  };

  const handleSetup = (): void => {
    const driverAttributes: DriverAttributes = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    };

    //create three FmNotifications objects
    createNotifications().then((notifs) => {
      const fairmaticConfiguration: FairmaticConfiguration = {
        sdkKey: 'your_sdk_key_here',
        driverId: 'driverId',
        driverAttributes: driverAttributes,
        notifications: notifs,
      };

      FairmaticSDK.setup(fairmaticConfiguration)
        .then((result: FairmaticOperationResult) => {
          console.log('response: ', result);
          if (result.isSuccess) console.log('Setup Succesful');
          else console.log('Setup Failed because of ', result.errorMessage);

         FairmaticSDK.getBuildVersion().then((version) => {
            console.log('Build Version: ', version);
          });
        })
        .catch((error: any) => {
          console.error('Error setting up Fairmatic SDK:', error);
        });

      // Register the callbacks
      FairmaticSDK.registerFairmaticCallbackEventListener(handleEvent);
    });
  };

  const handleStartPeriod1 = (): void => {
    FairmaticSDK.startDriveWithPeriod1()
      .then(() => {
        console.log('Drive started successfully');
        // Handle success if needed
      })
      .catch((error: any) => {
        console.error('Error starting P1 drive:', error);
        // Handle error if needed
      });
  };

  const handleStartPeriod2 = (): void => {
    const trackingId: string = 'p2-tracking-id'; // Pass trackingId
    FairmaticSDK.startDriveWithPeriod2(trackingId)
      .then(() => {
        console.log('Drive started successfully');
        // Handle success if needed
      })
      .catch((error: any) => {
        console.error('Error starting P2 drive:', error);
        // Handle error if needed
      });
  };

  const handleStartPeriod3 = (): void => {
    const trackingId: string = 'p3-tracking-id'; // Pass trackingId
    FairmaticSDK.startDriveWithPeriod3(trackingId)
      .then(() => {
        console.log('Drive started successfully');
        // Handle success if needed
      })
      .catch((error: any) => {
        console.error('Error starting P3 drive:', error);
        // Handle error if needed
      });
  };

  const handleStopPeriod = (): void => {
    FairmaticSDK.stopPeriod()
      .then(() => {
        console.log('Period drive stopped successfully');
        // Handle success if needed
      })
      .catch((error: any) => {
        console.error('Error stopping period:', error);
        // Handle error if needed
      });
  };

  const handleTeardown = (): void => {
    FairmaticSDK.teardown()
      .then(() => {
        console.log('Teardown successful');
        // Handle success if needed
      })
      .catch((error: any) => {
        console.error('Error tearing down Fairmatic SDK:', error);
        // Handle error if needed
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
        <Button title="Get Settings" onPress={handleGetFairmaticSettings} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Utility Button" onPress={handleGetEventTypes} />
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
