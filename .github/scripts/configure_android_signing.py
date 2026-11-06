from pathlib import Path


build_file = Path("android/app/build.gradle")
contents = build_file.read_text()

signing_anchor = """        }
    }
    buildTypes {"""

signing_replacement = """        }
        release {
            storeFile file(System.getenv("LONGEVITY_KEYSTORE_PATH"))
            storePassword System.getenv("LONGEVITY_KEYSTORE_PASSWORD")
            keyAlias System.getenv("LONGEVITY_KEY_ALIAS")
            keyPassword System.getenv("LONGEVITY_KEY_PASSWORD")
        }
    }
    buildTypes {"""

release_anchor = """        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug"""

release_replacement = """        release {
            signingConfig signingConfigs.release"""

if contents.count(signing_anchor) != 1 or contents.count(release_anchor) != 1:
    raise SystemExit(
        "Generated Gradle signing structure did not match the expected Expo template"
    )

contents = contents.replace(signing_anchor, signing_replacement)
contents = contents.replace(release_anchor, release_replacement)
build_file.write_text(contents)
