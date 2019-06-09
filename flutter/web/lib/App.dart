import 'package:flutter_web/material.dart';
import 'utils/ResponsiveWidget.dart';
import 'pages/HomeWebPage.dart';
import 'pages/HomeMobilePage.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Titan',
        theme: ThemeData(
          primarySwatch: Colors.indigo,
        ),
        home: ResponsiveWidget(
            largeScreen: HomeWebPage(),
            smallScreen: HomeMobilePage(),
            mediumScreen: HomeMobilePage()));
  }
}
