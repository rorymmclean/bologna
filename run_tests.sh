if [[ ! -z "$SB_TEST" ]]; then
  RunType=$SB_TEST 
elif [[ ! -z "$sb_test" ]]; then
  RunType=$sb_test
else
  RunType="NOTEST"  
fi

RunType="$(tr [a-z] [A-Z] <<< "$RunType")"

if [[ ! -z $SB_LOOPS ]]; then
  Runloop=$SB_LOOPS 
elif [[ ! -z $sb_loops ]]; then
  Runloop=$sb_LOOPS
else
  Runloop=1  
fi

COUNTER=1

if [ "$RunType" == "1" ] || [ "$RunType" == "TEST1.JS" ] || [ "$RunType" == "TEST1" ]; then
  while :
  do
    node test1.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
  done
fi

if [ "$RunType" == "2" ] || [ "$RunType" == "TEST2.JS" ] || [ "$RunType" == "TEST2" ]; then
  while :
  do
    node test2.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
  done
fi

if [ "$RunType" == "3" ] || [ "$RunType" == "TEST3.JS" ] || [ "$RunType" == "TEST3" ]; then
  while :
  do
    node test3.js $COUNTER & 
    if [ $COUNTER == $Runloop ];
    then
      break
    fi
    COUNTER=$[$COUNTER +1]
  done
fi

# npm start 
