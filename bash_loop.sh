if [[ ! -z $SB_LOOPS ]]; then
  Runloop=$SB_LOOPS 
else
  Runloop=$sb_LOOPS
fi

COUNTER=1
while :
do
   echo "Welcome $COUNTER times"
   if [ $COUNTER == $Runloop ];
   then
    break
   fi
   COUNTER=$[$COUNTER +1]
done
