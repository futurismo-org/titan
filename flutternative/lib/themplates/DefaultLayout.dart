import 'package:flutter/material.dart';

class DefaultLayout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Titan"),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            '運営からのおすすめ',
            style: Theme.of(context).textTheme.headline,
          ),
          Text(
            '人気のカテゴリ',
            style: Theme.of(context).textTheme.headline,
          ),
          Text(
            '人気のチャレンジ',
            style: Theme.of(context).textTheme.headline,
          ),
        ],
      ),
    );
  }
}
