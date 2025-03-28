# Integrate the Fairmatic React Native SDK

## Package Installation and project setup

```shell
npm install react-native-fairmatic-sdk@3.0.0 --save
```

if you use `yarn`

```shell
yarn add react-native-fairmatic-sdk@3.0.0
```

<details>

<summary>iOS-specific installation steps</summary>

## iOS-specific installation steps

### Podfile changes

In your project's `Podfile`, add the following lines:

```ruby
target 'YourApp' do
  use_frameworks! # The Fairmatic SDK is provided as a dynamic framework
  # your pods go here
  ......
  # Add Fairmatic iOS Pod dependency
  pod 'FairmaticSDK', :git => 'https://github.com/fairmatic/fairmatic-cocoapods', :tag => '3.0.0'
  pod 'react-native-fairmatic-sdk', :path => '../node_modules/react-native-fairmatic-sdk'
```
and run `cd ios & pod install`

> [!WARNING]
> Fairmatic React Native Library needs `use_frameworks!` which in turn will not work with Flipper. More on this can be read [here](https://github.com/facebook/flipper/issues/2414).

### Adjusting project settings

#### Background Modes

Allow background location updates and background fetch for your app:
On the project screen, click Capabilities → Turn Background Modes on → Select Location updates and Background Fetch

#### Permission-related keys in `Info.plist`

If your app does not already have them, please include the following keys in your app's `Info.plist`:

```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>We need background location permission to provide you with
driving analytics</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need background location permission to provide you with
driving analytics</string>
<key>NSMotionUsageDescription</key>
<string>We use activity to detect your trips faster and more accurately.
This also reduces the amount of battery we use.</string>
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Bluetooth</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Bluetooth</string>
```

> [!NOTE] 
> Even though we won't actually use Bluetooth features, Apple requires this message whenever Bluetooth code is present in an app. This is just a technical requirement.


#### Background task ID

For the Fairmatic SDK to be more accurate in uploading all trip data, it needs to have [background fetch capability](https://developer.apple.com/documentation/uikit/using-background-tasks-to-update-your-app) and a background task id declared in your Info.plist file. You must add the following line in `Info.plist` file:

```xml
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
	<string>com.fairmatic.sdk.bgrefreshtask</string>
</array>
```

</details>

## Setup the Fairmatic SDK in code

The following code snippet shows how to initialize the SDK. You will need the SDK key and the driver details.

```typescript
// Create driver attributes
const driverAttributes: DriverAttributes = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
};

const fairmaticNotification: FairmaticTripNotification = {
  title: "Fairmatic Trip",
  content: "Monitoring a trip",
  iconResourceName: "fm_car",
};

// Replace with your SDK key
const sdk_key = "your_sdk_key_here";

const fairmaticConfiguration: FairmaticConfiguration = {
  sdkKey: sdk_key,
  driverId: "your_driver_id",
  driverAttributes: driverAttributes,
  notification: fairmaticNotification,
};

FairmaticSDK.setup(fairmaticConfiguration)
  .then((result: FairmaticOperationResult) => {
    console.log("response: ", result);
    if (result.isSuccess) console.log("Setup Succesful");
    else console.log("Setup Failed because of ", result.errorMessage);
  })
  .catch((error: any) => {
    console.error("Error setting up Fairmatic SDK:", error);
  });
```

> [!IMPORTANT]
> The `FairmaticSDK.setup()` API should be called at every app launch with proper configuration. Failing to do so will result in errors in the trip APIs.

## Call the insurance APIs

### Insurance period 1
Start insurance period 1 when the driver starts the day and is waiting for a request. The tracking ID is a key that is used to uniquely identify the insurance trip.

```typescript
const trackingId: string = "p1-tracking-id";
FairmaticSDK.startDriveWithPeriod1(trackingId)
  .then((result: FairmaticOperationResult) => {
    if (result.isSuccess) console.log("P1 drive started successfully");
    else console.log("Drive failed because of ", result.errorMessage);
  })
  .catch((error: any) => {
    console.error("Error starting P1 drive:", error);
  });
```

### Insurance period 2
Start insurance period 2 when the driver accepts the passenger's or the company's request.

```typescript
const trackingId: string = "p2-tracking-id";
FairmaticSDK.startDriveWithPeriod2(trackingId)
  .then((result: FairmaticOperationResult) => {
    if (result.isSuccess) console.log("P2 drive started successfully");
    else console.log("Drive failed because of ", result.errorMessage);
  })
  .catch((error: any) => {
    console.error("Error starting P2 drive:", error);
  });
```

### Insurance period 3
Start insurance period 3 when the passenger/goods board the vehicle. In case of multiple passengers, the SDK needs to stay in insurance period 3.

```typescript
const trackingId: string = "p3-tracking-id";
FairmaticSDK.startDriveWithPeriod3(trackingId)
  .then((result: FairmaticOperationResult) => {
    if (result.isSuccess) console.log("P3 drive started successfully");
    else console.log("Drive failed because of ", result.errorMessage);
  })
  .catch((error: any) => {
    console.error("Error starting P3 drive:", error);
  });
```

### Stopping the insurance period
Stop the insurance period when the driver ends the work day. Call stop period when the driver is no longer looking for a request.

```typescript
FairmaticSDK.stopPeriod()
  .then((result: FairmaticOperationResult) => {
    if (result.isSuccess) console.log("Period stopped successfully");
    else console.log("Period stop failed because of ", result.errorMessage);
  })
  .catch((error: any) => {
    console.error("Error stopping period:", error);
  });
```

## Fairmatic SDK settings

Ensure you check for any errors and take appropriate actions in your app to resolve them, ensuring the Fairmatic SDK operates smoothly. Use the following code snippet to perform this check:

```typescript
FairmaticSDK.getFairmaticSettings()
  .then((settings) => {
    console.log("Fairmatic Settings:", settings);
    if (settings && settings.length > 0) {
      console.log("Detected Fairmatic Setting Errors:");
      settings.forEach((settingError) => {
        console.log(`- Error: ${settingError}`);
      });
    } else {
      console.log("No Fairmatic setting errors detected");
    }
  })
  .catch((error) => {
    console.error("Failed to get Fairmatic settings:", error);
  });
```

## Disable SDK [Optional step]
Call teardown API when the driver is no longer working with the application and logs out. This will completely disable the SDK on the application.

```typescript
FairmaticSDK.teardown()
  .then(() => {
    console.log("Teardown successful");
  })
  .catch((error: any) => {
    console.error("Error tearing down Fairmatic SDK:", error);
  });
```