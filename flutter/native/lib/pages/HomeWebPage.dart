import 'package:flutter/material.dart';

import '../utils/AppColors.dart';
import '../components/ContantFrame.dart';
import '../components/DrawerRow.dart';

class HomeWebPage extends StatefulWidget {
  @override
  _HomeWebPageState createState() => _HomeWebPageState();
}

class _HomeWebPageState extends State<HomeWebPage> {
  int selectedOption = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Container(
            width: 250,
            height: double.infinity,
            color: AppColors.colorPrimary,
            child: new ListView(children: <Widget>[
              DrawerRow(selectedOption == 0, "About", 'images/drawer_about.png',
                  onPressed: () {
                setState(() {
                  selectedOption = 0;
                });
              }),
              DrawerRow(
                selectedOption == 1,
                "Speaking",
                'images/drawer_speaking.png',
                onPressed: () {
                  setState(() {
                    selectedOption = 1;
                  });
                },
              ),
              DrawerRow(
                selectedOption == 2,
                "Open Source",
                'images/drawer_open_source.png',
                onPressed: () {
                  setState(() {
                    selectedOption = 2;
                  });
                },
              ),
              DrawerRow(
                selectedOption == 3,
                "Skills",
                'images/drawer_skills.png',
                onPressed: () {
                  setState(() {
                    selectedOption = 3;
                  });
                },
              ),
              DrawerRow(
                selectedOption == 4,
                "Awards",
                'images/drawer_award.png',
                onPressed: () {
                  setState(() {
                    selectedOption = 4;
                  });
                },
              )
            ]),
          ),
          Expanded(
            child: ContentFrame(selectedOption),
          )
        ],
      ),
    );
  }
}
