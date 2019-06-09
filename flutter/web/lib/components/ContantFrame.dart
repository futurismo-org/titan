import 'package:flutter_web/material.dart';
import '../pages/AboutPage.dart';

class ContentFrame extends StatelessWidget {
  int drawerPosition;

  ContentFrame(this.drawerPosition);

  @override
  Widget build(BuildContext context) {
    return getHomeContainer();
  }

  Widget getHomeContainer() {
    switch (drawerPosition) {
      case 0:
        return AboutPage();
      case 1:
        return AboutPage();
      case 2:
        return AboutPage();
      default:
        return AboutPage();
    }
  }
}
