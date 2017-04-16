export class Preferences {
  constructor(public id: string,
              public newRoomNotification: boolean,
              public newMessageNotification: boolean,
              public useEmojis: boolean,
              public convertAsciiEmoji: boolean,
              public saveMobileBandwidth: boolean,
              public collapseMediaByDefault: boolean,
              public unreadRoomsMode: boolean,
              public autoImageLoad: boolean,
              public emailNotificationMode: boolean,
              public unreadAlert: boolean,
              public desktopNotificationDuration: boolean,
              public viewMode: boolean,
              public hideUsernames: boolean,
              public hideAvatars: boolean,
              public hideFlexTab: boolean,
              public highlights: string[]) {
  }
}
