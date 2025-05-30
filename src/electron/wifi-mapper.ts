// wifi-mapper.js or .ts

import { spawn } from "child_process";
import { join } from "path";

type SpeedTestResult = {
  source: string;
  download: number;
  upload: number;
  ping: number;
  server: string;
};

export async function runLibreSpeedTest(
  appRoot: string
): Promise<SpeedTestResult | null> {
  const binaryPath = join(appRoot, "speedtest", "speedtest-librespeed");

  return new Promise((resolve) => {
    const proc = spawn(binaryPath, ["--server", "93", "--json"]);

    let output = "";
    let error = "";

    proc.stdout.on("data", (data) => {
      output += data.toString();
    });

    proc.stderr.on("data", (data) => {
      error += data.toString();
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        console.error("LibreSpeed failed:", error);
        return resolve(null);
      }

      try {
        const result = JSON.parse(output);
        resolve({
          source: "libre",
          download: result.download / 1e6,
          upload: result.upload / 1e6,
          ping: result.ping,
          server: "Chicago (Sharktech) #93",
        });
      } catch (e) {
        console.error("Failed to parse JSON:", output, "/n", e);
        resolve(null);
      }
    });
  });
}
