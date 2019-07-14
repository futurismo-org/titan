import 'package:flutter/material.dart';

import 'pages/HomePage.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Titan',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: HomePage(title: 'Titan'),
    );
  }
}
