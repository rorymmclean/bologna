node stats.js & 

npm start & 

if [[ ! -z "$SB_TEST" ]]; then
  RunType=${SB_TEST//[!0-9]/}
elif [[ ! -z "$sb_test" ]]; then
  RunType=${sb_test//[!0-9]/}
else
  RunType="NO_TEST"  
fi

RunType="$(tr [a-z] [A-Z] <<< "$RunType")"

if [[ ! -z $SB_LOOPS ]]; then
  Runloop=${SB_LOOPS//[!0-9]/}
elif [[ ! -z $sb_loops ]]; then
  Runloop=${sb_loops//[!0-9]/}
else
  Runloop=1  
fi

COUNTER=1

if [ "$RunType" == "1" ]; then
  while :
  do
    node test_1.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
    sleep 60s
  done
fi

if [ "$RunType" == "2" ]; then
  while :
  do
    node test_2.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
    sleep 60s
  done
fi

if [ "$RunType" == "3" ]; then
  while :
  do
    node --max-old-space-size=2048 test_3.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
    sleep 60s
  done
fi

if [ "$RunType" == "4" ]; then
  while :
  do
    node test_4.js & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
    sleep 60s
  done
fi
