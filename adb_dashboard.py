# Create a menu in python that with be able to execute 3 other scripts also written in python.
# The menu should be able to exit the program.
# The menu should be able to go back to the main menu from the other scripts.
# The menu should be able to execute the other scripts more than once.
import os
import subprocess
import re
import time
SHELL_SCRIPTS_DIR = "/home/adamsl/linuxBash/menu_shell_scripts"

def get_ip_address():
    try:
        # Run the command and capture the output
        output = subprocess.check_output(["adb", "shell", "ip", "route"], text=True)
        
        # Use a regular expression to find the IP address following 'src'
        match = re.search(r'src\s+(\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b)', output)
        if match:
            return match.group(1)  # Return the matched IP address
        else:
            return "IP address not found"
    except subprocess.CalledProcessError as e:
        return f"Failed to run command: {e}"
    except Exception as e:
        return f"An error occurred: {e}"

# Example usage
# print(get_ip_address())

    

def main():
    print( "                                                 " )
    print( "                                                 " )
    print( "                                                 " )
    print( "      ///////////////////////////////////////////" )
    print( "      The adb dashboard"                    )
    print( "      ///////////////////////////////////////////" )
    print( "\n")
    print("     1. show device ip address" )
    print("     2. switch to tcpip mode")
    print("     3. connect to wifi")
    print("     4. clear logcat.") 
    print("     5. build release apk.") 
    print("     6. copy the release apk to c:\Android") 
    print("     4. open car wash page and click on phone icon")
    print("     5. open log viewer")
    print("     h. show mycustom table" )
    print("     t. delete all messages with est in them") 
    print("     keys. show gcm_keys table" )
    print("     g. delete all guests.  keep admin") 
    print("     6. Exit \n" )

    choice = input("    Please select an option: >>----> ") 
    print( "                                     " )

    if choice == "1":
        print( "show device ip address" )
        # cd to the directory where the script is located
        #os.chdir( "/home/adamsl/zero_w_projects/temp/rpi-rgb-led-matrix" )
        # open vscode in the directory
        # run a command in the windows OS
        # open a cmd prompt to send a command to windows
        
        
        os.system ( "adb shell ip route" )
        input("press enter to continue...")
        main()

    
        
    elif choice == "2":
        print( "switching to tcpip mode... " )
        os.system( "adb tcpip 5555 " )
        main()

    elif choice == "3":
        print( "connecting to wifi... " )
        os.system( "adb connect " + get_ip_address() + ":5555" )
        main()

    elif choice == "4":
        print("clearing logcat... " )
        os.system( "adb logcat -c" )
        main()
    
    elif choice == "5":
        print( "building release apk... " )
        # change Windows 10 directory to "C:\Users\EG\Desktop\2022\florida_car_wash\baseparent"
        # change directories to c:\users
        
        os.chdir( "C:/Users/EG/Desktop/2022/florida_car_wash/baseparent" )

        # run the command "gradlew assembleRelease"
        os.system( "gradlew assembleRelease" )
        main()
        
    elif choice == "6":
        print( "copying release apk to c:\Android... " )
        os.system("copy C:\\Users\\EG\\Desktop\\2022\\florida_car_wash\\baseparent\\app\\build\\outputs\\apk\\release\\app-release.apk C:\\Android\\app-release.apk")

        main()
    
    elif choice == "t":
        print ( "deleting test messages..." )
        os.system( "./delete_test_messages.sh" )
        main()
    
    elif choice == "keys":
        print ( "show gcm_keys table..." )
        os.system( "./show_gcm_keys.sh" )
        main()
    
    elif choice == "g":
        print("deleting all guests... " )
        # cd to the directory where the script is located
        #os.chdir( "/home/adamsl/zero_w_projects/temp/rpi-rgb-led-matrix" )
        # open vscode in the directory
        os.system( "./delete_guests.sh" )
        main()
    
    elif choice == "m":
        print("deleting all messages... " )
        # cd to the directory where the script is located
        #os.chdir( "/home/adamsl/zero_w_projects/temp/rpi-rgb-led-matrix" )
        # open vscode in the directory
        os.system( SHELL_SCRIPTS_DIR + "/delete_all_messages.sh" )
        main()
    
    elif choice == "c":
        print("deleting all conversations... " )
        # cd to the directory where the script is located
        #os.chdir( "/home/adamsl/zero_w_projects/temp/rpi-rgb-led-matrix" )
        # open vscode in the directory
        os.system( SHELL_SCRIPTS_DIR + "/delete_all_conversations.sh" )
        main()
    
    elif choice == "j":
        print("cleaning the monitored objects from the jewelry machine... " )
        # cd to the directory where the script is located
        #os.chdir( "/home/adamsl/zero_w_projects/temp/rpi-rgb-led-matrix" )
        # open vscode in the directory
        os.system( SHELL_SCRIPTS_DIR + "/delete_monitors.sh" )
        main()

    else:  # if the user enters anything other than 1, 2, 3 or 4 then the program will exit with an error message.

        print("Invalid input, please try again.")

    return 0


main()
