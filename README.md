# myMovie

myMovie is a single page application that is integrated with Nginx & Aria2 & docker.
It allows you to:

  - Run the app as a docker image on any OS
  - Download videos with Bittorrent and Metalink by using Arira2
  - Select the downloaded videos and watch them from any host (PC/Tablet/Phone) within the network by using nginx

Usage

  - Build the docker image of myMovie:
    ```sh
    make build
    ```
  - Run the image locally:
    ```sh
    make start
    ```
  - Download the image from docker hub:
    ```sh
    docker pull hankshz/mymovie
    ```

## How to setup it on Windows 7
It's much complicated to setup docker on Windows (and Windows older than Windows 10 requires even extra effort) compared to on Linux.

  - Follow the [doc](https://docs.docker.com/toolbox/toolbox_install_windows/) to install Docker Toolbox on Windows
  - Run myMovie:
    ```sh
    $ docker run -p 80:80 hankshz/mymovie
    ```
    This will only make the app visible on **docker VM**'s Port 80
  - Get the IP of docker VM:
    ```sh
    $ docker-machine ip default:
    192.168.99.100
    ```
  - Get the IP of windows host:
    ```sh
    > ipconfig
    ```
  - Setup IP forwarding with admin:
    ```sh
    > netsh interface portproxy add v4tov4 listenaddress=127.0.0.1 listenport=80 connectaddress=192.168.99.100 connectport=80
    ```
  - Highly possible, you also need to enable the port from Windows Firewall. [This](https://wiki.mcneel.com/zoo/window7firewall) blog explains it pretty well
> Note that $ means commands run on docker prompt and > means commands run on cmd prompt
