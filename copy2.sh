find /mnt/mnt2/ -maxdepth 1 -name "temp_$1_master*" -exec cp {} /mnt/mnt1 \;
find /mnt/mnt1/ -maxdepth 1 -name "temp_$1_master*" -exec cp {} /mnt/mnt2 \;
