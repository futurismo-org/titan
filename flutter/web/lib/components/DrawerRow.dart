import 'package:flutter_web/material.dart';
import 'space/Width16.dart';

import '../utils/AppColors.dart';

class DrawerRow extends StatelessWidget {
  final String icon, title;

  final Function() onPressed;

  final bool isSelected;

  DrawerRow(this.isSelected, this.title, this.icon, {this.onPressed});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      color: isSelected ? AppColors.colorSecondary : null,
      padding: EdgeInsets.fromLTRB(36, 0, 0, 0),
      child: new Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Image.asset(icon),
            Width16(),
            new Text(title,
                textAlign: TextAlign.start,
                style: TextStyle(
                    fontFamily: "Lato",
                    fontSize: 14,
                    color: Color.fromRGBO(207, 209, 233, 1),
                    fontWeight: FontWeight.w100))
          ]),
      onPressed: onPressed,
    );
  }
}
