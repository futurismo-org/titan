# https://medium.com/@kikap/how-to-automatically-hot-reload-flutter-when-dart-source-files-change-6e8fdb523004
while true
do
    find native/lib/ -name '*.dart' | \
        entr -d -p ./bin/hotreloader.sh /_
done
