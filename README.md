# Screenshooter

Create screenshots of websites via POST request

## Install

```sh
$ apt-get update
$ apt-get install -y curl
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/janesmae/screenshooter/master/install/install_on_debian.sh)"
```

## How to make requests

```sh
curl --data "url=http(s)://full.domain.org/including.files?and=get_params" https://app_host:8080
```

## Screenshots

Screenshots are located in `/home/screenshooter/screenshooter/results` folder.

## License

The content of this repository is **&copy; Jaan Janesmae** and released under **MIT License**.<br>
You can find a copy of this license in [LICENSE][license] file or [https://opensource.org/licenses/MIT][license_web].

[license]:        ./LICENSE
