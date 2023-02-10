#
# This script deletes the html logs from the server.  
# It also delete the debug_log, conversations and all users except for the admin from the mycustom_WP1 database.
#
mysql -D tinman72_rest_api_demo -u tinman72_4a4e_cg --password='th3RIver0fL1F3Data$toraGePl@ce' -h americansjewelry.com -e "delete from monitored_objects;"
mysql -D mycustom_WP1 -u mycustom --password='f7Jh1jv27O' -h mycustombusinessapp.com -e "DELETE FROM wp_mcba_users WHERE isAdmin='0'"
mysql -D mycustom_WP1 -u mycustom --password='f7Jh1jv27O' -h mycustombusinessapp.com -e "DELETE FROM wp_mcba_chat_messages;"
mysql -D mycustom_WP1 -u mycustom --password='f7Jh1jv27O' -h mycustombusinessapp.com -e "DELETE FROM wp_mcba_chat_conversations;"
mysql -D mycustom_WP1 -u mycustom --password='f7Jh1jv27O' -h mycustombusinessapp.com -e "DELETE FROM debug_log;"

ftp -in << EOF
open ftp.floridascarwash.com
user mycustom@awmstaging3.com f7Jh1jv27O
cd /floridascarwash.com
delete error_log
cd /floridascarwash.com/wp-admin
delete error_log
cd /floridascarwash.com/wp-includes
delete error_log
cd /floridascarwash.com/wp-content/plugins/MCBA-Wordpress
delete error_log
bye
EOF

ftp -in << EOF
open ftp.mycustombusinessapp.com
user mycustom f7Jh1jv27O
cd /public_html
delete error_log
cd /public_html/wp-admin
delete error_log
cd /public_html/wp-includes
delete error_log
cd /public_html/wp-content/plugins/MCBA-Wordpress
delete error_log
cd /public_html/MCBA-MasterServer
delete registerMCBA_log.txt
delete error_log
bye
EOF


# thanks chatgpt for showing the non-interactive version.  this is great, we don't even need expect.
#mysql -D awmstag2_car -u awmstag2_car --password='.&#CL=}2W$EO' -h floridascarwash.com -e "DELETE FROM wp_mcba_chat_conversations;"
