enum Text {
  World = 'WORLD',
  Dev = 'DEV',
}

Page({
  data: {
    text: Text.World,
  },
  handleClick() {
    this.setData({
      text: this.data.text === Text.World ? Text.Dev : Text.World,
    });
  },
});
